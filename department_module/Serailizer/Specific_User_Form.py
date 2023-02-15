from rest_framework import serializers

from department_module.models import Specific_User_Form


class Specific_User_Form_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Specific_User_Form
        fields = '__all__'
