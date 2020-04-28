from rest_framework.test import APIClient, APITestCase
from rest_framework.exceptions import ValidationError
from rest_framework import status
from django.urls import reverse
from matcher.models import Answer, Match
from account.models import CustomUser
import factory
from django.db.models import signals, Q
import sys


class CustomUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CustomUser

    username = factory.Faker('word')
    email = factory.Faker('email')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    password = factory.Faker('password')


@factory.django.mute_signals(signals.pre_save, signals.post_save)
class MatchFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Match

    user1 = factory.SubFactory(CustomUserFactory)
    user2 = factory.SubFactory(CustomUserFactory)


class MatcherTestView(APITestCase):
    answer_url = reverse('answer')
    current_match_url = reverse('current-match')
    terminate_current_match_url = reverse('terminate-current-match')

    def setUp(self):
        self.client = APIClient()

    def get_current_match(self, user):
        return Match.objects.filter(time_end__isnull=True).get(Q(user1=user) | Q(user2=user))

    def test_get_current_match_for_user1(self):
        user1 = CustomUserFactory()
        user2 = CustomUserFactory()
        match = MatchFactory(user1=user1, user2=user2)

        self.client.force_authenticate(user=user1)

        response = self.client.get(self.current_match_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.get_current_match(user1), match)

    def test_get_current_match_for_user2(self):
        user1 = CustomUserFactory()
        user2 = CustomUserFactory()
        match = MatchFactory(user1=user1, user2=user2)

        self.client.force_authenticate(user=user2)

        response = self.client.get(self.current_match_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.get_current_match(user2), match)

    def test_terminate_current_match(self):
        user1 = CustomUserFactory()
        user2 = CustomUserFactory()
        MatchFactory(user1=user1, user2=user2)

        self.client.force_authenticate(user=user1)

        response = self.client.post(self.terminate_current_match_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        with self.assertRaises(Match.DoesNotExist):
            self.get_current_match(user1)
