from django.db import models
from form_module.models import Form
from .Department import Department


class Department_related_form(models.Model):
    posts = models.ForeignKey(Form,on_delete=models.CASCADE)
    Department = models.ForeignKey(Department,on_delete=models.CASCADE)
    date_of_creation = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.posts} {self.date_of_creation}'


