from rest_framework import serializers
from form_module.models import Questions


class Questions_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = '__all__'



