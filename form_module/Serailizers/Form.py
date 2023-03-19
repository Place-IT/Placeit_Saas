from rest_framework import serializers

from Custom_helper_functions import check_eligible
from form_module.models import Form
from django.utils import timezone


class Form_Serailizer(serializers.ModelSerializer):
    no_of_user_enroled = serializers.IntegerField(read_only=True)
    Originator_id = serializers.SlugField(source="Originator.id", read_only=True)
    Originator_email = serializers.SlugField(source="Originator.email", read_only=True)
    Originator_i_card_image = serializers.SlugField(source="Originator.i_card_image", read_only=True)
    User_submitted = serializers.BooleanField(read_only=True)
    Company_image = serializers.SerializerMethodField()
    Company_name = serializers.SlugField(source="Visitng_record.company.Company_name", read_only=True)
    is_user_eligible = serializers.SerializerMethodField()
    expired= serializers.SerializerMethodField()
    class Meta:
        model = Form
        depth = 1
        read_only_fields = ["no_of_user_enroled", "Originator_id", "Originator_email", "User_submitted"]
        fields = ['id',
                  "Type",
                  "Creation_Date",
                  "expire_date_time",
                  "Visitng_record",
                  'no_of_user_enroled',
                  'Originator_id',
                  "Originator_email",
                  "User_submitted",
                  "questions_set",
                  "Originator_i_card_image",
                  "Company_image",
                  "Company_name",
                  "conditions",
                  "is_user_eligible",
                  "expired"
                  ]

    def get_Company_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.Visitng_record.company.Company_logo.url)

    def get_is_user_eligible(self, obj):
        request = self.context.get("request")
        return check_eligible(request, obj)

    def get_expired(self,obj):
        # print(timezone.now() > obj.expire_date_time,timezone.now() ,obj.expire_date_time)
        if timezone.now() > obj.expire_date_time:
            return True
        else:
            return False