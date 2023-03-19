from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from form_module.models import Form


class Conditions(models.Model):
    conditon_1 = models.DecimalField(max_digits=5, decimal_places=2,
                                     validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True,
                                     default=0.00, help_text="avg of all sem required")

    conditon_2 = models.DecimalField(max_digits=5, decimal_places=2,
                                     validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True,
                                     default=0.00, help_text="10 percentage ")

    conditon_3 = models.DecimalField(max_digits=5, decimal_places=2,
                                     validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True,
                                     default=0.00, help_text="12 percentage")

    conditon_4 = models.BooleanField(default=False, help_text="live kt not allowed")

    conditon_5 = models.BooleanField(default=False, help_text="Dead kt not allowed")

