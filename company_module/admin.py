from django.contrib import admin
from .models import Company,Visiting_company_record

class Company_model_admin(admin.ModelAdmin):
    list_display = ['Company_name']
    search_fields = ['Company_name']

    class Meta:
        model = Company
class Visiting_company_record_model_admin(admin.ModelAdmin):
    list_display = ['Company_name']
    search_fields = ['Company_name']

    class Meta:
        model = Company

# Register your models here.
admin.site.register(Company, Company_model_admin)
admin.site.register(Visiting_company_record)