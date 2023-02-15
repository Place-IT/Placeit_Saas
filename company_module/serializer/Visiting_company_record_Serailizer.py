from rest_framework import serializers

from company_module.models import Visiting_company_record


class Visiting_company_record_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Visiting_company_record
        fields = '__all__'
