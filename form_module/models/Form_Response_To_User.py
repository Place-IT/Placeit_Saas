from django.core.validators import FileExtensionValidator
from django.db import models
from .Form import Form


class Response_To_User(models.Model):
    Form_id = models.ForeignKey(Form, on_delete=models.CASCADE)
    User = models.ForeignKey("user_module.User", on_delete=models.CASCADE, related_name='form_responses')
    response_Type = models.CharField(choices=[("placed", "placed"), ("selected", "selected")], max_length=20, null=True,
                                     blank=True)
    offer_letter=models.FileField( blank=True,null=True,
        upload_to="students/offerletter/" ,validators=[FileExtensionValidator(allowed_extensions=["pdf"])])
    class Meta:
        unique_together = ('Form_id', 'User',)

    def __str__(self):
        return f"{self.Form_id} -> {self.User} ={self.response_Type}"
