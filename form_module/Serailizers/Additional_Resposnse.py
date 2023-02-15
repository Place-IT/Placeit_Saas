from rest_framework import serializers
from form_module.models import Additional_Response


class Additional_Response_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Additional_Response
        fields = '__all__'