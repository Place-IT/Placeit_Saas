from django.db.models import Sum, OuterRef, Exists,Count
from django.forms import DateInput
from django_filters.rest_framework import DjangoFilterBackend
from guardian.shortcuts import assign_perm
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from django_filters import rest_framework as filters

import logging

from Custom_helper_functions import CustomViewset, Gurdian_model_viewset, ModelNamePermission
from Custom_helper_functions.Permissions import Get_Allow_list_permission
from department_module.Serailizer.Department_related_formSerailizer import Department_related_form_Serailizer

from form_module.Serailizers import Form_Serailizer, Questions_Serailizer
from form_module.models import Form, ResponseFromUser

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
    queryset = Form.objects.all()
    serializer_class = Form_Serailizer

    permission_classes = [ModelNamePermission("form", "form_module", custom_check_object=Get_Allow_list_permission), ]

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = FormFilter
    search_fields = ["Company_name"]
    modelname = "form"

    def filter_returner(self, queryset, request):
       if request.user.groups.filter(name="Faculty").exists():
           print("Faculty")
           return queryset.annotate(
               no_of_user_enroled=Count("responsefromuser"),
           ) \
               .filter(Originator=request.user.id) \
               .order_by("-expire_date_time", "-Creation_Date","pk")
       elif request.user.groups.filter(name="Student").exists():
           print("Student")
           return queryset.annotate(
            no_of_user_enroled=Count("responsefromuser"),
            User_submitted=Exists(ResponseFromUser.objects.filter(user__id=request.user.id, Form_id=OuterRef('pk')))
        ) \
            .filter(Originator__Affliated_Department__id=request.user.Affliated_Department.id, ) \
            .order_by("-expire_date_time", "-Creation_Date","pk")
       return queryset

    def create(self, request, form_data=None, *args, **kwargs):
        data = request.data
        try:
            email = data['questions']
        except KeyError:
            return Response({'questions': "questions not found in form data"})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        comment = serializer.save()
        comment.Originator = request.user
        comment.save()

        for x in self.list_of_permission:
            assign_perm(f"Form.{x}{self.modelname}", request.user, comment)

        z = request.data["questions"]
        for x in z:
            x["form"] = comment.id

        """
        {
        "posts": null,
        "Department": null
        }
        """

        try:
            a = Questions_Serailizer(data=z, many=True)
            if a.is_valid():
                a.save()
            logger.info(f'question creation completed ')
        except Exception as e:
            logger.error(f'{e} data= {data}')
            return Response({"error": "Some internal error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            a = Department_related_form_Serailizer(data={
                "posts": comment.id,
                "Department": request.user.Affliated_Department.id
            })
            if a.is_valid():
                a.save()

            Depertment_logger.info(f"{a.id} added in department {request.user.Affliated_Department.id}")

        except Exception as e:
            Depertment_logger.error(f'{e} data= {data}')

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
