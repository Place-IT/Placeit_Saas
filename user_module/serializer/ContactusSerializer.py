from rest_framework import serializers
from user_module.models import Contactus

class Contactus_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Contactus
        fields = '__all__'