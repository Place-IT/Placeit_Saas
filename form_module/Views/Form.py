from django.db.models import Sum, OuterRef, Exists, Count
from django.forms import DateInput
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters
import logging
from Custom_helper_functions import CustomViewset, Gurdian_model_viewset, ModelNamePermission
from Custom_helper_functions.Permissions import Get_Allow_list_permission_GET
from form_module.Serailizers import Form_Serailizer
from form_module.models import Form, ResponseFromUser
from rest_framework.response import Response

logger = logging.getLogger('Form_Admin_Logger')
Depertment_logger = logging.getLogger('Department_Logger')


class FormFilter(filters.FilterSet):
    """
    Filter class for the Form model.
    """
    start_date = filters.DateFilter(
        label="start_date", field_name="Creation_Date", lookup_expr="gte",
        widget=DateInput(attrs={'type': 'date'})
    )
    end_date = filters.DateFilter(
        label="end_date", field_name="Creation_Date", lookup_expr="lte",
        widget=DateInput(attrs={'type': 'date'})
    )
    id = filters.NumberFilter(
        label="id", field_name="id", lookup_expr="exact"
    )
    Originator = filters.NumberFilter(
        label="Originator", field_name="Originator", lookup_expr="exact"
    )
    expiration_date = filters.DateTimeFilter(
        label="expiration_date", field_name="expire_date_time", lookup_expr="lte"
    )

    class Meta:
        model = Form
        fields = ["Creation_Date", "id", 'Originator', 'expire_date_time']


class Form_viewset(CustomViewset, Gurdian_model_viewset):
    """
    Viewset for the Form model.
    """
    queryset = Form.objects.all().order_by("-Creation_Date", "id")
    serializer_class = Form_Serailizer
    permission_classes = [ModelNamePermission("form", "form_module", custom_check_view=Get_Allow_list_permission_GET), ]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = FormFilter
    search_fields = ["Company_name"]
    modelname = "form"

    def filter_returner(self, queryset, request):
        """
        Custom filtering logic for the Form model.
        """
        if request.query_params.get("id") != "":
            return queryset

        if request.user.groups.filter(name="Faculty").exists() or request.user.groups.filter(name="Head").exists():
            return queryset.annotate(
                no_of_user_enrolled=Count("responsefromuser"),
            ).filter(Originator=request.user.id).order_by("-Creation_Date", "-expire_date_time", "pk")
        elif request.user.groups.filter(name="Student").exists():
            print("Student")
            return queryset.annotate(
                no_of_user_enrolled=Count("responsefromuser"),
                User_submitted=Exists(ResponseFromUser.objects.filter(user__id=request.user.id, Form_id=OuterRef('pk')))
            ).filter(
                department_related_form__Department_id=request.user.Affliated_Department.id
            ).order_by("-Creation_Date", "-expire_date_time", "pk")

        return queryset

    def create(self, request, *args, **kwargs):
        """
        Override create method to disallow creation of Form objects.
        """
        return Response({"error": "Forbidden"}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """
        Override update method to disallow updating Form objects.
        """
        return Response({"error": "Forbidden"}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """
        Override destroy method to disallow deleting Form objects.
        """
        return Response({"error": "Forbidden"}, status=status.HTTP_400_BAD_REQUEST)

    def Condition_check(self, request, queryset, *args, **kwargs):
        """
        Override Condition_check method to apply custom conditions for the Form model.
        """
        if request.user.is_anonymous:
            return queryset, True
        else:
            return super().Condition_check(request, queryset, *args, **kwargs)
