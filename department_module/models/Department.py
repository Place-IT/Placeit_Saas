from django.db import models


# Create your models here.

class Department(models.Model):
    name = models.CharField(default="", max_length=50, blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

