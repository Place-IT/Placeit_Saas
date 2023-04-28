from django.db import models

class Contactus(models.Model):
    Full_name=models.CharField(max_length=225)
    Email=models.EmailField()
    message=models.TextField(null=True,blank=True)
    images=models.ImageField(upload_to="contactUs",null= True,blank=True)
    created_now=models.DateTimeField(auto_now_add=True)



