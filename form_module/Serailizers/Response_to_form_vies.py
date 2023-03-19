from rest_framework import serializers
from form_module.models import ResponseFromUser


class Response_to_form_view_Serailizer(serializers.ModelSerializer):

    class Meta:
        model = ResponseFromUser
        fields = "__all__"