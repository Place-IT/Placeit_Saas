from django.test import TestCase


class LandingTest(TestCase):
    def test_details(self):
        response = self.client.get('')
        self.assertEqual(response.status_code, 200)
