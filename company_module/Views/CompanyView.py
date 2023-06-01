from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter

from Custom_helper_functions import Gurdian_model_viewset, ModelNamePermission
from company_module.models import Company
from company_module.serializer import Company_Serailizer


class Company_viewset(Gurdian_model_viewset):

    queryset = Company.objects.all().order_by("Company_name")
    serializer_class = Company_Serailizer
    permission_classes = [ModelNamePermission("company", "company_module")]
    modelname="company"

    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_fields =["id",]
    search_fields = ["Company_name"]