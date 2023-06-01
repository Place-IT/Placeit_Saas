from rest_framework import serializers
from ..models import Company


class Company_Serailizer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'
