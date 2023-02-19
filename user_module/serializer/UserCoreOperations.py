from rest_framework import serializers
from user_module.models import User


class UserserializerCoreOperations(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id','email',
                  'password','re_password',
                  'email_token_dateTime_expire',
                  'is_active','is_staff',
                  'Affliated_Department',
                  ]
        read_only_fields = ['First_name','email_token_dateTime_expire','email_token','is_active','is_staff',
                            'Affliated_Department',
                            'is_faculty']
        ordering = ['-id']



