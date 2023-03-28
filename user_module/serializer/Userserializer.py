from django.core.validators import validate_email
from rest_framework import serializers

from department_module.models import Department
from form_module.Serailizers import Form_Response_To_User_Serailizer
from user_module.models import User

class Userserializer(serializers.ModelSerializer):
    form_responses = Form_Response_To_User_Serailizer(many=True,read_only=True)
    groups = serializers.SlugRelatedField(many=True,read_only=True,slug_field='name',)
    Full_name=serializers.CharField(read_only=True)
    Affliated_Department_id=serializers.PrimaryKeyRelatedField( source="Affliated_Department",required=True,
    queryset=Department.objects.all(),read_only=False)
    # email_verified=serializers.BooleanField(read_only=True,source="email_verified")
    class Meta:
        model = User
        depth = 2
        read_only_fields = ['last_login','url',"email",'phone_number','is_faculty',"email_verified"]
        fields=[
 'Affliated_Department',
            "Affliated_Department_id",
 'Bio',
 'Building_name_And_RoomNumber',
 'Country_name',
 'Date_Of_Birth',
 'DeadKT',
 'Diploma',
 'First_name',
 'Full_name',
 "avg_sem",
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
            'form_responses',
            "groups","email_verified"]