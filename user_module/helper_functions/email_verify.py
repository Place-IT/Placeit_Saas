import logging
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.urls import reverse
from rest_framework.response import Response
from rest_framework.status import *
# from placement.settings import EMAIL_HOST_USER
from Placeit_Saas.settings import EMAIL_HOST_USER
from user_module.models import User

logger = logging.getLogger('UserAuth')


def email_verfy_core(email, request):
    try:

        user = User.objects.get(email=email)

        # check if already activated
        if user.email_verified == True:
            return Response({'message': 'already-active'}, status=HTTP_201_CREATED)

        a = user.create_email_Token()
        q = user.email_token_dateTime_expire
        user.save()

        if a == True:
            context = {
                'current_user': user,
                'email': user.email,
                'reset_password_url': "{}?token={}".format(request.build_absolute_uri
                                                             (reverse('emailverifyconform')),
                                                             user.email_token)
            }

            email_html_message = render_to_string('email/Email_verify.html', context)
            email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

            msg = EmailMultiAlternatives(
                # title:
                "Email verification PLaceit ",
                # message:
                email_plaintext_message,
                # from:
                EMAIL_HOST_USER,
                # to:
                [user.email]
            )
            msg.attach_alternative(email_html_message, "text/html")
            # msg.send()
            # print(msg)
            z = 0
            try:
                z = msg.send(fail_silently=False)
            except Exception as e:
                print(e)
            if z != 1:
                user.email_token_dateTime_expire = q
                user.save()
                # logger.info(f'email not sent with eero code 0 for {email}')
                # print(f'email not sent with erro code 0 for {email}')
            # print(z,"hhhhfff")

            return Response({'success': f'email sent '}, status=HTTP_201_CREATED)
        else:
            return Response({'success': f'email already  sent  on email {email}'}, status=HTTP_201_CREATED)



    except User.DoesNotExist:
        return Response({'error': 'email does not exist'}, status=HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        # logger.critical(f'emailSend Failed',e)
        return Response({'error': 'some unexpected error'}, status=HTTP_500_INTERNAL_SERVER_ERROR)
