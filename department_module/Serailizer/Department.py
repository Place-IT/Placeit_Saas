from rest_framework import serializers

from department_module.models import Department


class Department_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'