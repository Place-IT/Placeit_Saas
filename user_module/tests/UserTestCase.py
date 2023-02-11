from django.test import TestCase
from Placeit_Saas.settings import EMAIL_HOST_USER
from user_module.models import User
from django.core import mail


class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(email="nimishboda-coemumbai@bvp.edu.in", password="heybro12345", First_name='cool',
                            Last_name='user')

    def test_basic_user_creation(self):
        user = User.objects.get(email="nimishboda-coemumbai@bvp.edu.in")
        self.assertEqual(user.is_superuser, False)
        self.assertEqual(user.is_active, True)

    def test_updating_user_creation(self):
        user = User.objects.get(email="nimishboda-coemumbai@bvp.edu.in")
        self.assertEqual(user.is_active, True)
        user.is_active = False
        user.save()
        self.assertEqual(user.is_active, False)

    def test_send_email(self):
        mail.send_mail('Hello12345', 'Here is the message.',
                       EMAIL_HOST_USER, ['to@example.com'],
                       fail_silently=False)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, 'Hello12345')
