from django.db.models import Exists
from rest_framework import serializers
from django.db.models import OuterRef, Subquery
from Custom_helper_functions import check_eligible
from department_module.models import Department_related_form
from form_module.models import Form, ResponseFromUser
from django.utils import timezone


class Form_Serailizer(serializers.ModelSerializer):
    no_of_user_enroled = serializers.IntegerField(read_only=True)
    Originator_id = serializers.SlugField(source="Originator.id", read_only=True)
    Originator_email = serializers.SlugField(source="Originator.email", read_only=True)
    Originator_i_card_image = serializers.SlugField(source="Originator.i_card_image", read_only=True)
    # User_submitted = serializers.BooleanField(read_only=True)
    User_submitted = serializers.SerializerMethodField(read_only=True)
    Company_image = serializers.SerializerMethodField()
    Company_name = serializers.SlugField(source="Visitng_record.company.Company_name", read_only=True)
    is_user_eligible = serializers.SerializerMethodField()
    expired= serializers.SerializerMethodField()
    department_names=serializers.SerializerMethodField()

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
                  "expired",
                  "department_names",
                  "Creator_note"
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
    def get_User_submitted(self, obj):
        request = self.context.get("request")
        user_has_response = ResponseFromUser.objects.filter(
            user_id=request.user.id,
            Form_id=obj.id
        ).annotate(
            has_response=Exists(
                Subquery(
                    ResponseFromUser.objects.filter(
                        user_id=request.user.id,
                        Form_id=obj.id
                    ).values('id')
                )
            )
        ).values('has_response').first()
        return user_has_response['has_response'] if user_has_response else False
    def get_department_names(self, obj):
        request = self.context.get("request")
        if request.user.groups.filter(name="Head").exists():
            post_names = []
            department_related_forms = Department_related_form.objects.filter(posts_id=obj.id)
            for department_related_form in department_related_forms:
                post_names.append(department_related_form.Department.name)
            return post_names
        return ""