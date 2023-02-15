from rest_framework import serializers
from form_module.models import Response_To_User


class Form_Response_To_User_Serailizer(serializers.ModelSerializer):
    visiting_reocrd = serializers.IntegerField(source='Form_id.Visitng_record.id',read_only=True)
    company = serializers.IntegerField(source='Form_id.Visitng_record.company.id',read_only=True)
    User_email = serializers.EmailField(source='User.email',read_only=True)
    company_name = serializers.CharField(source='Form_id.Visitng_record.company.Company_name',read_only=True)
    class Meta:
        model = Response_To_User
        fields = ["Form_id",
                  "User_email",
                  "User",
                  "response_Type",
                  'visiting_reocrd',
                  "company",
                  "company_name",
                  "offer_letter"
        ]