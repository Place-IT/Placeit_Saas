from rest_framework import serializers
from form_module.models import Conditions


class Conditions_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Conditions
        fields = '__all__'

