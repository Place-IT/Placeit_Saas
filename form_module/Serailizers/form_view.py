from rest_framework import serializers

from form_module.models import Form


class Form_View_Serailizer(serializers.ModelSerializer):
    no_of_user_enroled = serializers.IntegerField(read_only=True)
    Originator_id=serializers.SlugField(source="Originator.id",read_only=True)
    Originator_email=serializers.SlugField(source="Originator.email",read_only=True)
    Originator_i_card_image=serializers.SlugField(source="Originator.i_card_image",read_only=True)
    User_submitted = serializers.BooleanField(read_only=True)
    Company_image=serializers.SerializerMethodField()
    Company_name=serializers.SlugField(source="Visitng_record.company.Company_name",read_only=True)
    class Meta:
        model = Form
        read_only_fields = [ "no_of_user_enroled" , "Originator_id" , "Originator_email" , "User_submitted"]
        fields =[ 'id',
                  "Type",
                  "Creation_Date",
                  "expire_date_time",
                  # "Originator",
                  "Visitng_record",
                  'no_of_user_enroled',
                  'Originator_id',
                  "Originator_email",
                  "User_submitted",
                  "Originator_i_card_image",
                  "Company_image",
                  "Company_name",
                  "conditions"
                  ]

    def get_Company_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.Visitng_record.company.Company_logo.url)

