from rest_framework.test import APISimpleTestCase
from django.urls import reverse, resolve
from account.api.views import register, login, password_update, details_update



class TestUrls(APISimpleTestCase):

    def test_register_url_resolves(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func, register)

    def test_login_url_resolves(self):
        url = reverse('login')
        self.assertEqual(resolve(url).func, login)

    def test_password_update_url_resolves(self):
        url = reverse('password-update')
        self.assertEquals(resolve(url).func, password_update)

    def test_details_update_url_resolves(self):
        url = reverse('details-update')
        self.assertEquals(resolve(url).func, details_update)