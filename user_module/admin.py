from django.contrib import admin

# from guardian.admin import GuardedModelAdmin
from user_module.models import User


class Usermodeladmin(admin.ModelAdmin):
    list_display = ['First_name', 'email', "id"]
    search_fields = ['First_name', "email", 'Last_name', 'email']

    class Meta:
        model = User


admin.site.register(User, Usermodeladmin)

# class AuthorAdmin(GuardedModelAdmin):
#     class Meta:
#         model = User
#
# admin.site.register(User, AuthorAdmin)
