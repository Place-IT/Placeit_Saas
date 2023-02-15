from rest_framework import serializers

from department_module.models import Department_related_form


class Department_related_form_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Department_related_form
        fields = '__all__'