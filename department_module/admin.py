from django.contrib import admin
from django.contrib.admin import ChoicesFieldListFilter

from .models import Department,Department_related_form ,Specific_User_Form


class Department_model_admin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']


    class Meta:
        model = Department


class Department_related_form_model_admin(admin.ModelAdmin):
    list_display = ['posts',  'Department',"date_of_creation"]
    search_fields = ['Department']
    list_filter = (
        ('Department', ChoicesFieldListFilter),
    )


    class Meta:
        model = Department_related_form

class Specific_User_Form_model_admin(admin.ModelAdmin):


    class Meta:
        model = Specific_User_Form



admin.site.register(Department,Department_model_admin)
admin.site.register(Department_related_form,Department_related_form_model_admin)
admin.site.register(Specific_User_Form,Specific_User_Form_model_admin)


