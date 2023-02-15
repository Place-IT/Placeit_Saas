from django.test import TestCase
from django.utils import timezone

from company_module.models import Company, Visiting_company_record


class Visiting_company_recordTestCase(TestCase):
    def setUp(self):
        a=Company.objects.create(Company_name="Jio", Employers_Website="https://www.django-rest-framework.org/api-guide/testing/")
        Visiting_company_record.objects.create(company=a,MinLpa_offered=5.5,MaxLpa_offered=6.8,visiting_date=timezone.now())


    def test_basic_user_creation(self):
        compa = Company.objects.get(Company_name="Jio")
        vcr = Visiting_company_record.objects.get(company=compa)
        self.assertEqual(vcr.company,compa)
        self.assertEqual(vcr.MinLpa_offered,5.5)


    def test_updating_user_creation(self):
        compa = Company.objects.get(Company_name="Jio")
        vcr = Visiting_company_record.objects.get(company=compa)
        self.assertEqual(vcr.company,compa)
        self.assertEqual(vcr.MinLpa_offered,5.5)
        vcr.MinLpa_offered=6.7
        vcr.save()





