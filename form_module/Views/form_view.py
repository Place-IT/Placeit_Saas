from django.db.models import Sum, OuterRef, Exists, Count
from django.forms import DateInput
from django_filters.rest_framework import DjangoFilterBackend
from guardian.shortcuts import assign_perm
from rest_framework import status
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters
import logging
from rest_framework.response import Response

from Custom_helper_functions import CustomViewset, Gurdian_model_viewset, ModelNamePermission
from Custom_helper_functions.Permissions import Get_Allow_list_permission
from department_module.Serailizer.Department_related_formSerailizer import Department_related_form_Serailizer
from department_module.models import Department_related_form, Department
from form_module.Serailizers import Form_Serailizer, Questions_Serailizer, Form_View_Serailizer, Conditions_Serailizer
from form_module.models import Form, ResponseFromUser

logger = logging.getLogger('Form_Admin_Logger')
Department_logger = logging.getLogger('Department_Logger')


class FormFilter(filters.FilterSet):
    start_date = filters.DateFilter(
        label="start_date",
        field_name="Creation_Date",
        lookup_expr="gte",
        widget=DateInput(attrs={'type': 'date'})
    )
    end_date = filters.DateFilter(
        label="end_date",
        field_name="Creation_Date",
        lookup_expr="lte",
        widget=DateInput(attrs={'type': 'date'})
    )
    id = filters.NumberFilter(
        label="id",
        field_name="id",
        lookup_expr="exact"
    )
    Originator = filters.NumberFilter(
        label="Originator",
        field_name="Originator",
        lookup_expr="exact"
    )
    expiration_date = filters.DateTimeFilter(
        label="expiration_date",
        field_name="expire_date_time",
        lookup_expr="lte"
    )

    class Meta:
        model = Form
        fields = ["Creation_Date", "id", 'Originator', 'expire_date_time']

# this view is impelmented to create form
class Form_view_viewset(CustomViewset, Gurdian_model_viewset):
    queryset = Form.objects.all()
    serializer_class = Form_View_Serailizer
    permission_classes = [ModelNamePermission("form", "form_module", custom_check_object=Get_Allow_list_permission), ]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = FormFilter
    search_fields = ["Company_name"]
    modelname = "form"

    def create(self, request, form_data=None, *args, **kwargs):
        data = request.data
        try:
            email = data['questions']
        except KeyError:
            return Response({'questions': "questions not found in form data"})

        try:
            conditions = data['conditions_copy']
        except KeyError:
            return Response({'conditions_copy': "conditions not found in form data"})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        a = {id: None}
        try:
            a = Conditions_Serailizer(data=conditions)
            if a.is_valid():
                b = a.save()
                comment.conditions = b
            else:
                return Response({"error": "while creating conditions"})
        except Exception as e:
            print(e)
            return Response({"error": "while creating conditions"})

        comment.Originator = request.user
        comment.save()

        for x in self.list_of_permission:
            assign_perm(f"Form.{x}{self.modelname}", request.user, comment)

        z = request.data["questions"]
        # print(comment, z)
        for x in z:
            x["form"] = comment.id

        try:
            a = Questions_Serailizer(data=z, many=True)
            if a.is_valid():
                a.save()
            logger.info(f'question creation completed ')
        except Exception as e:
            logger.error(f'{e} data= {data}')
            return Response({"error": "Some internal error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if request.user.groups.filter(name="Faculty").exists():
            try:
                a = Department_related_form_Serailizer(data={
                    "posts": comment.id,
                    "Department": request.user.Affliated_Department.id
                })
                if a.is_valid():
                    a.save()
                Department_logger.info(f"{a.id} added in department {request.user.Affliated_Department.id}")
            except Exception as e:
                Department_logger.error(f'{e} data= {data}')
        else:
            try:
                department_names = request.data.get("department_names", [])
                unique_department_names = list(set(department_names))  # Remove duplicates from the list
                departments = Department.objects.filter(name__in=unique_department_names)

                for department in departments:
                    Department_related_form.objects.create(posts=comment, Department=department)
            except Exception as e:
                logger.error(f'{e} data= {data}')
                return Response({"error": "Some internal error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        headers = self.get_success_headers(serializer.data)
        return Response({"Completed": "Post Created Successfully"}, status=status.HTTP_201_CREATED, headers=headers)

    def filter_returner(self, queryset, request):
        if request.user.groups.filter(name="Faculty").exists() :
            print("Faculty")
            return queryset.annotate(
                no_of_user_enrolled=Count("responsefromuser"),
            ).filter(Originator=request.user.id).order_by("-expire_date_time", "-Creation_Date", "pk")
        elif request.user.groups.filter(name="Student").exists():
            print("Student")
            return queryset.annotate(
                no_of_user_enrolled=Count("responsefromuser"),
                User_submitted=Exists(ResponseFromUser.objects.filter(user__id=request.user.id, Form_id=OuterRef('pk')))
            ).filter(department_related_form__Department_id=request.user.Affliated_Department.id).order_by(
                "-expire_date_time", "-Creation_Date", "pk")
        return queryset

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({"Completed": "Post Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT)
