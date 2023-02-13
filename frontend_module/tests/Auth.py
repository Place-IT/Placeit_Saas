from django.test import TestCase
from user_module.models import User
from django.contrib.auth.models import Group


class Test_Redirect_without_verification(TestCase):
    def setUp(self):
        self.credentials = {
            'email': 'seventest30-coemumbai@bvp.edu.in',
            'password': 'secret11122@'}
        a=User.objects.create_user(**self.credentials)
        my_group = Group.objects.get_or_create(name='Student')
        my_group = Group.objects.get(name='Student')
        my_group.user_set.add(a)

    def test_Unverified_redirect(self):

        self.client.login(email="seventest30-coemumbai@bvp.edu.in",password="secret11122@")
        response = self.client.get('/auth/profile/',)
        self.assertRedirects(response, '/auth/emailverifysent/')

        # user_1=User.objects.get(email="seventest30-coemumbai@bvp.edu.in")
        # self.assertEqual(user_1.email_verified,False)
        #
        # user_1.email_verified = True
        # user_1.save()
        #
        # self.assertEqual(user_1.email_verified,True)
        # response = self.client.get('/auth/profile/',)
        # self.assertEqual(response.status_code, 200)
