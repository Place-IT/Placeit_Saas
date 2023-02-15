from rest_framework import serializers
from form_module.models import ViewdBy


class Stats_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = ViewdBy
        fields = '__all__'