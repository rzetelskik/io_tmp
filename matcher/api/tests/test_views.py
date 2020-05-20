import datetime

from django.urls import reverse
from rest_framework.exceptions import ValidationError
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from knox.models import AuthToken
from account.models import CustomUser


class TestView(APITestCase):
    terminate_url = reverse('terminate-current-match')
    match_url = reverse('current-match')

    def setUp(self):
        self.client = APIClient()
        self.user1 = CustomUser.objects.create_user(username="test1", email="test1@test.com",
                                                   first_name="test1", last_name="test1",
                                                   password="test1")
        self.token = AuthToken.objects.create(user=self.user1)[1]
        self.user2 = CustomUser.objects.create_user(username="test2", email="test2@test.com",
                                                   first_name="test2", last_name="test2",
                                                   password="test2")

    def api_authenticate(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token)

    def test_terminate_current_match_view_no_match(self):
        self.api_authenticate()
        response = self.client.post(self.terminate_url)
        self.assertEquals(response.data['response'], "User has no current meeting.")
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_terminate_current_match_view_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.terminate_url)
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_current_match_view_no_match(self):
        self.api_authenticate()
        response = self.client.get(self.match_url)
        self.assertEquals(response.data['response'], "User has no current meeting.")
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_current_match_view_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.match_url)
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)