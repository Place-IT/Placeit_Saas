from rest_framework import serializers

from .Visiting_company_record_Serailizer import Visiting_company_record_Serailizer
from ..models import Company


class Company_Serailizer(serializers.ModelSerializer):
    # Visiting_record = Visiting_company_record_Serailizer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = '__all__'
