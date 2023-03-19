from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from Custom_helper_functions import ModelNamePermission, CustomViewset, return_q_year_gt, return_q_year_lt
from department_module.Serailizer import Department_Serailizer
from department_module.models import Department



class Department_viewset(CustomViewset,viewsets.ModelViewSet):

    queryset = Department.objects.all().order_by("id")
    serializer_class = Department_Serailizer

    permission_classes = [ModelNamePermission("department", "department_module")]

    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_fields =["id",]
    search_fields = ["name"]

    def filter_returner(self, queryset, request):
        if request.user.groups.filter(name="Faculty").exists() or request.user.groups.filter(name="Head").exists():
            return queryset
        else:
            return queryset.filter()
