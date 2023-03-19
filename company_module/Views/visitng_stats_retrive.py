from datetime import datetime

from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.mixins import ListModelMixin
from rest_framework.viewsets import  GenericViewSet

from Custom_helper_functions import CustomViewset, ModelNamePermission
from company_module.models import Visiting_company_record
from company_module.serializer import Visiting_company_Stats_record_Serailizer
from django_filters import rest_framework as filters, DateFromToRangeFilter


class VisitngFilter(filters.FilterSet):
    visiting_date  = DateFromToRangeFilter()
    class Meta:
        model = Visiting_company_record
        fields = ['visiting_date']
# {'date_after': '2016-01-01', 'date_before': '2016-02-01'}

def return_year(request):
    return int(request.query_params.get("passing_year")) or datetime.now().year

class VisitngStats(CustomViewset,
                    ListModelMixin,
                   GenericViewSet):
    serializer_class=Visiting_company_Stats_record_Serailizer
    queryset = Visiting_company_record.objects.all().order_by("-visiting_date")
    permission_classes = [ModelNamePermission("visiting_company_record", "company_module")]
    filter_backends = [DjangoFilterBackend]
    filterset_class = VisitngFilter



    def filter_returner(self, queryset, request):
        if request.user.groups.filter(name="Faculty").exists() or request.user.groups.filter(name="Head").exists():
            return queryset.filter(Q(visiting_date__month__gt=5)&Q(visiting_date__year=(return_year(request)-1))|Q(visiting_date__month__lt=6)&Q(visiting_date__year=(return_year(request))))
        else:
            return queryset.filter()