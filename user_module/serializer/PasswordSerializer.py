from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
class PasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True,validators=[validate_password])