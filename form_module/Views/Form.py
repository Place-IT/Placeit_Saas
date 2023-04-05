from django.db.models import Sum, OuterRef, Exists,Count
from django.forms import DateInput
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters
import logging
from Custom_helper_functions import CustomViewset, Gurdian_model_viewset, ModelNamePermission
from Custom_helper_functions.Permissions import  Get_Allow_list_permission_GET
from form_module.Serailizers import Form_Serailizer
from form_module.models import Form, ResponseFromUser
from rest_framework.response import Response

logger = logging.getLogger('Form_Admin_Logger')
Depertment_logger = logging.getLogger('Department_Logger')


class FormFilter(filters.FilterSet):
    start_date = filters.DateFilter(label="start_date", field_name="Creation_Date", lookup_expr="gte",
                                    widget=DateInput(attrs={'type': 'date'}))
    end_date = filters.DateFilter(label="end_date", field_name="Creation_Date", lookup_expr="lte",
                                  widget=DateInput(attrs={'type': 'date'}))
    id = filters.NumberFilter(label="id", field_name="id", lookup_expr="exact")
    Originator = filters.NumberFilter(label="Originator", field_name="Originator", lookup_expr="exact")
    expiration_date = filters.DateTimeFilter(label="expiration_date", field_name="expire_date_time", lookup_expr="lte")

    class Meta:
        model = Form
        fields = ["Creation_Date", "id", 'Originator', 'expire_date_time']


class Form_viewset(CustomViewset, Gurdian_model_viewset):
    queryset = Form.objects.all().order_by("Creation_Date")
    serializer_class = Form_Serailizer

    permission_classes = [ModelNamePermission("form", "form_module", custom_check_view=Get_Allow_list_permission_GET), ]

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = FormFilter
    search_fields = ["Company_name"]
    modelname = "form"

    def filter_returner(self, queryset, request):
       # for post
       # print(request.query_params.get("id"))
       if request.query_params.get("id") != "":
           return queryset

       # for timeline
       if request.user.groups.filter(name="Faculty").exists():
           # print("Faculty")
           return queryset.annotate(
               no_of_user_enroled=Count("responsefromuser"),
           ) \
               .filter(Originator=request.user.id) \
               .order_by("-expire_date_time", "-Creation_Date","pk")
       elif request.user.groups.filter(name="Student").exists():
           # print("Student")
           return queryset.annotate(
            no_of_user_enroled=Count("responsefromuser"),
            User_submitted=Exists(ResponseFromUser.objects.filter(user__id=request.user.id, Form_id=OuterRef('pk')))
        ) \
            .filter(Originator__Affliated_Department__id=request.user.Affliated_Department.id) \
            .order_by("-expire_date_time", "-Creation_Date","pk")

       return queryset

    def create(self, request, *args, **kwargs):
        return Response({"error":"Forbiden"},status=status.HTTP_400_BAD_REQUEST,)
    def update(self, request, *args, **kwargs):
        return Response({"error":"Forbiden"},status=status.HTTP_400_BAD_REQUEST,)
    def destroy(self, request, *args, **kwargs):
        return Response({"error":"Forbiden"},status=status.HTTP_400_BAD_REQUEST,)
    def Condition_check(self, request, queryset, *args, **kwargs):
        if request.user.is_anonymous:
            return queryset,True
        else:
            return super().Condition_check(request,queryset,*args,**kwargs)