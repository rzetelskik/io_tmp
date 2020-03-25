from django.test import SimpleTestCase
from django.urls import reverse, resolve
from app.views import FrontendAppView


class TestUrls(SimpleTestCase):

    def test_frontend_url_resolves(self):
        url = reverse('frontend')
        self.assertEqual(resolve(url).func.view_class, FrontendAppView)
