from django.core.validators import validate_email
from rest_framework import serializers

# from Form.Serailizers import Form_Response_To_User_Serailizer
from user_module.models import User

class Userserializer(serializers.ModelSerializer):
    # form_responses = Form_Response_To_User_Serailizer(many=True,read_only=True)
    groups = serializers.SlugRelatedField(many=True,read_only=True,slug_field='name',)
    # email_verified=serializers.BooleanField(read_only=True,source="email_verified")
    class Meta:
        model = User
        depth = 2
        # fields = "__all__"
        read_only_fields = ['last_login','url',"email",'phone_number','is_faculty',"email_verified"]
        # exclude = ['user_permissions','groups','passwor','re_password','is_active','is_staff','is_superuser','email_token','email_token_dateTime_expire',"is_suspended","last_login"]
        fields=[
 # 'Affliated_Department',
 'Bio',
 'Building_name_And_RoomNumber',
 'Country_name',
 'Date_Of_Birth',
 'DeadKT',
 'Diploma',
 'First_name',
 'Full_name',
 'Gate_Status',
 'Github_profile',
 'HSC',
 'Internship',
 'JEE',
 'Last_name',
 'LiveKT',
 'Locality_name',
 'MIS_no',
 'MhCET',
 'No_Of_DeadKT',
 'No_Of_LiveKT',
 'Parent_phone_number',
 'PostalCode',
 'Resume_profile',
 'Roll_no',
 'SSC',
 'Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6', 'Sem7', 'Sem8', 'State_name', 'Student_phone_number',
 'collage_joinig_year', 'collage_passingYear', 'email','i_card_image', 'id',  'linkedin_profile', 'middle_name',  'pk',
            # 'form_responses',
            "groups","email_verified"]