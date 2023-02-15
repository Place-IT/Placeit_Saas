from django.test import TestCase

from company_module.models import Company


class CompanyTestCase(TestCase):
    def setUp(self):
        Company.objects.create(Company_name="Jio", Employers_Website="https://www.django-rest-framework.org/api-guide/testing/")


    def test_basic_user_creation(self):
        compa = Company.objects.get(Company_name="Jio")
        self.assertEqual(compa.Company_name,"Jio")
        self.assertEqual(compa.Employers_Website,"https://www.django-rest-framework.org/api-guide/testing/")


    def test_updating_user_creation(self):
        compa = Company.objects.get(Company_name="Jio")
        self.assertEqual(compa.Company_name,"Jio")
        self.assertEqual(compa.Employers_Website,"https://www.django-rest-framework.org/api-guide/testing/")
        compa.Employers_Website="https://www.youtube.com/watch?v=8R3kBb7jCf8"
        compa.save()
        self.assertEqual(compa.Employers_Website,"https://www.youtube.com/watch?v=8R3kBb7jCf8")




