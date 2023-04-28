from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework import viewsets, mixins
from rest_framework.viewsets import GenericViewSet

from Placeit_Saas.settings import EMAIL_HOST_USER
from user_module.models import Contactus
from user_module.serializer import Contactus_Serailizer
from django.contrib.auth.models import Group, Permission



class ContactusViewset(mixins.CreateModelMixin,
                       GenericViewSet):
    queryset = Contactus.objects.all().order_by('id')
    serializer_class = Contactus_Serailizer
    def perform_create(self, serializer):
        serializer.save()
        print(serializer.data["images"])
        try:
            context = {
                'full_name':serializer.data["Full_name"],
                'Email':serializer.data["Email"],
                'message':serializer.data["message"],
                'images':serializer.data["images"],
                'created_now':serializer.data["created_now"],
            }

            email_html_message = render_to_string('email/contactUS.html', context)
            email_plaintext_message = render_to_string('email/user_reset_password.txt', context)



            msg = EmailMultiAlternatives(
                # title:
                "New Issue From User",
                # message:
                email_plaintext_message,
                # from:
                EMAIL_HOST_USER,
                # to:
                list(Group.objects.get(name="Developer").user_set.values_list('email', flat=True))
            )
            msg.attach_alternative(email_html_message, "text/html")
            # msg.send()
        #     # print(msg)
            z = 0
            try:
                z = msg.send(fail_silently=False)
            except Exception as e:
                print(e)
            if z != 1:
                print("done")
        except Exception as e:
            print(e)




