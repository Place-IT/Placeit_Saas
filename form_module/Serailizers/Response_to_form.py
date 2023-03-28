from rest_framework import serializers

from Custom_helper_functions import check_eligible
from form_module.models import ResponseFromUser, Response_To_User
from user_module.models import User

class Response_to_form_Serailizer(serializers.ModelSerializer):
    user_id = serializers.SlugField(source="user.id", read_only=True)
    Form_id = serializers.IntegerField(source="Form_id.id", read_only=True)
    is_user_eligible = serializers.SerializerMethodField()
    # in current visitng record
    user_already_placed = serializers.SerializerMethodField()

    class Meta:
        depth = 1
        model = ResponseFromUser
        fields = [
            "id",
            "major_Response",
            "Form_id",
            "additional_response_set",
            "user_id",
            "is_user_eligible",
            "user_already_placed"
        ]

    def get_is_user_eligible(self, obj):
        request = self.context.get("request")
        return check_eligible(request, obj.Form_id,False,User.objects.get(id=obj.user_id))

    def get_user_already_placed(self, obj):
        print(Response_To_User.objects.filter(User=obj.user_id, Form_id=obj.Form_id).exists())
        if Response_To_User.objects.filter(User=obj.user_id, Form_id=obj.Form_id).exists():
            return True
        else:
            return False
