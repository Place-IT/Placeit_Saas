from django.db import models
from company_module.models import Visiting_company_record
from .conditions_check import Conditions


class Form(models.Model):
    Visitng_record = models.ForeignKey(Visiting_company_record, on_delete=models.CASCADE, blank=False, null=False)
    Type = models.CharField(max_length=5, choices=[("Dc", "Data Collection"), ("sl", "Selection"), ("pl", "Placement")],
                            null=True, blank=True)
    Creation_Date = models.DateTimeField(auto_now_add=True, blank="", null=True)
    Originator = models.ForeignKey("user_module.User", on_delete=models.CASCADE, null=True, blank=True)
    Creator_note = models.TextField(default="")
    expire_date_time = models.DateTimeField(blank=False, null=False)
    conditions = models.ForeignKey(Conditions, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.id} {self.Visitng_record} -> {self.Type} {self.Creation_Date}"
