from django.db import models
from .Form import Form

class ViewdBy(models.Model):
    Form_id=models.ForeignKey(Form,on_delete=models.CASCADE)
    User=models.ForeignKey("user_module.User",on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.Form_id} -> {self.User}"