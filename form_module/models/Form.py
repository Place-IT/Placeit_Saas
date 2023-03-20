from django.db import models
from company_module.models import Visiting_company_record
from .conditions_check import Conditions
from meta.models import ModelMeta

class Form(ModelMeta,models.Model):
    Visitng_record = models.ForeignKey(Visiting_company_record, on_delete=models.CASCADE, blank=False, null=False)
    Type = models.CharField(max_length=5, choices=[("Dc", "Data Collection"), ("sl", "Selection"), ("pl", "Placement")],
                            null=True, blank=True)
    Creation_Date = models.DateTimeField(auto_now_add=True, blank="", null=True)
    Originator = models.ForeignKey("user_module.User", on_delete=models.CASCADE, null=True, blank=True)
    # TOdo:add creator note in form
    Creator_note = models.TextField(default="")
    expire_date_time = models.DateTimeField(blank=False, null=False)
    conditions = models.ForeignKey(Conditions, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.id} {self.Visitng_record} -> {self.Type} {self.Creation_Date}"

    _metadata = {
        'title': 'get_meta_name',
        'description': 'get_meta_note',
        'image': 'get_meta_image',
    }
    def get_meta_name(self):
        return f"{self.Visitng_record.company.Company_name}'s Drive"

    def get_meta_note(self):
        return f"{self.Visitng_record.company.Company_name}'s Drive on date {self.Visitng_record.visiting_date} for" \
               f" {self.Visitng_record.Position} - post by {self.Originator.email} "

    def get_meta_image(self):
        if self.Visitng_record.company.Company_logo:
            return self.Visitng_record.company.Company_logo.url

