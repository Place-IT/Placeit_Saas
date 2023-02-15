from django.db import models

from form_module.models import Form


class Questions(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE)
    type = models.CharField(blank=True, null=True, choices=[("UA", "User Acceptance"), ("E", "Extract")], max_length=3)
    Text_q=models.TextField(null=False,default="")
    Extract_from=models.TextField(default="[]",blank=True)


    """
    {
        "type": null,
        "Text_q": "",
        "Extract_from": "",
        "form": null
    }
    
    """

    def __str__(self):
        return f"{self.form} -> {self.type} -> {self.Text_q}"


