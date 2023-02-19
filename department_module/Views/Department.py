from django.db.models import Sum,Avg,Max,Min,Count,Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter

from Custom_helper_functions import ModelNamePermission, CustomViewset
from department_module.Serailizer import Department_Serailizer
from department_module.models import Department


class Department_viewset(CustomViewset,viewsets.ModelViewSet):

    queryset = Department.objects.all()
    serializer_class = Department_Serailizer

    permission_classes = [ModelNamePermission("department", "department_module")]

    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_fields =["id",]
    search_fields = ["name"]

    def filter_returner(self, queryset, request):
        #TODO: yearwise and user place
        # print(request.query_params.get("passing_year"),type(request.query_params.get("passing_year")),int(request.query_params.get("passing_year")))
        # type(request.query_params.get("passing_year"))

        if request.user.groups.filter(name="Faculty").exists() or request.user.groups.filter(name="Head").exists():
            # 2020
            return queryset.filter(user__collage_passingYear=2020,user__groups__name="Student",
                                   department_related_form__posts__Visitng_record__visiting_date__year=2023,).annotate(
                no_of_students=Sum("user"),
                no_of_students_placed=Sum("user"),
                no_of_company_visited=Sum("department_related_form__posts__Visitng_record__company"),
                Average_Package=Avg("department_related_form__posts__Visitng_record__MaxLpa_offered"),
                Range_max=Max("department_related_form__posts__Visitng_record__MaxLpa_offered"),
                Range_min=Min("department_related_form__posts__Visitng_record__MinLpa_offered"),
                Total_no_of_HIgher_Studies_students=Count("user__future_options",filter=Q(user__future_options="Hs")),
                Total_no_of_Gate_Studies_students=Count("user__Gate_Status",filter=Q(user__Gate_Status=True)),
                Total_no_of_Entrepreneurship_students=Count("user__future_options",filter=Q(user__future_options="entru")),
            ).order_by("id")

        else:
            return queryset.filter()
