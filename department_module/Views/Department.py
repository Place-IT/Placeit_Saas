from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter

from Custom_helper_functions import ModelNamePermission
from department_module.Serailizer import Department_Serailizer
from department_module.models import Department


class Department_viewset(viewsets.ModelViewSet):

    queryset = Department.objects.all()
    serializer_class = Department_Serailizer

    permission_classes = [ModelNamePermission("department", "Department")]

    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_fields =["id",]
    search_fields = ["name"]