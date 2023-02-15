from django.db import models

from form_module.models import Form, ResponseFromUser
from form_module.models.Questions import Questions


class Additional_Response(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE)
    user = models.ForeignKey("user_module.User", on_delete=models.CASCADE)
    Answer = models.TextField(blank=True, null=True)
    Question = models.ForeignKey(Questions, on_delete=models.CASCADE)
    form_response = models.ForeignKey(ResponseFromUser, on_delete=models.CASCADE,null=True)

    @property
    def Final_Answer(self):
        if self.Question.type == "UA":
            return f"{self.Answer}"

    def __str__(self):
        return f"{self.form} -> {self.user} -> {self.Answer}"
