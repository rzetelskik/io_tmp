from django.test import Client, TestCase
from app.views import FrontendAppView
from django.urls import reverse, resolve


class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.frontend_url = reverse('frontend')

    def test_frontend_view_get(self):
        response = self.client.get(self.frontend_url)
        self.assertEquals(response.status_code, 200)


