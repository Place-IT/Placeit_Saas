from rest_framework import serializers

from company_module.models import Visiting_company_record


class Visiting_company_record_Serailizer(serializers.ModelSerializer):
    String_repr=serializers.SerializerMethodField()

    def get_String_repr(self,obj):
        return obj.__str__()

    class Meta:
        model = Visiting_company_record
        # fields = '__all__'
        fields=[
            "id",
            "company",
            "visiting_date",
            "HRName",
            "Position",
            "MinLpa_offered",
            "MaxLpa_offered",
            "Description",
            "Pdf",
            "String_repr"
        ]