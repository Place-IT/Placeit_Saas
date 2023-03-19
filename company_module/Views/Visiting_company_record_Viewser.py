# from rest_framework.decorators import action
# from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from Custom_helper_functions import ModelNamePermission
from company_module.models import Visiting_company_record
from company_module.serializer import Visiting_company_record_Serailizer


class Visiting_company_record_viewset(viewsets.ModelViewSet):
    serializer_class=Visiting_company_record_Serailizer
    queryset = Visiting_company_record.objects.all().order_by("-visiting_date")
    permission_classes = [ModelNamePermission("visiting_company_record", "company_module")]

    filter_backends = [DjangoFilterBackend]
    filterset_fields =["company","id"]


