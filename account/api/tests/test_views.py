from django.urls import reverse
from rest_framework.exceptions import ValidationError
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from knox.models import AuthToken
from account.models import CustomUser


class TestView(APITestCase):
    register_url = reverse('register')
    login_url = reverse('login')
    password_update_url = reverse('password-update')
    user_detail_url = reverse('custom-user-detail')
    register_data = {"username": "test1", "email": "test1@test.com",
                     "first_name": "test1", "last_name": "test1",
                     "password": "test1", "password_repeat": "test1"}
    login_data = {"username": "test", "password": "test"}
    password_change_data = {"password": "test", "new_password": "newtest", "new_password_repeat": "newtest"}

    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username="test", email="test@test.com",
                                                   first_name="test", last_name="test",
                                                   password="test")
        self.token = AuthToken.objects.create(user=self.user)[1]

    def api_authenticate(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token)

    def test_register_no_data(self):
        response = self.client.post(self.register_url)
        self.assertRaises(ValidationError)
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register(self):
        response = self.client.post(self.register_url, self.register_data)
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_login_no_data(self):
        response = self.client.post(self.login_url)
        self.assertRaises(ValidationError)
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login(self):
        response = self.client.post(self.login_url, self.login_data)
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_password_update(self):
        self.api_authenticate()
        response = self.client.put(self.password_update_url, self.password_change_data)

        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_password_update_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.put(self.password_update_url, self.password_change_data)

        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_custom_user_detail(self):
        self.api_authenticate()
        response = self.client.get(self.user_detail_url)

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(CustomUser.objects.get(username=response.data["username"]), self.user)

