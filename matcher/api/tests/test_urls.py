from django.urls import reverse, resolve
from rest_framework.test import APISimpleTestCase
from matcher.api.views import AnswerView, current_match_view, terminate_current_match_view


class TestUrls(APISimpleTestCase):

    def test_answer_url_resolves(self):
        url = reverse('answer')
        self.assertEqual(resolve(url).func.view_class, AnswerView)

    def test_current_match_url_resolves(self):
        url = reverse('current-match')
        self.assertEqual(resolve(url).func, current_match_view)

    def test_terminate_current_match_url_resolves(self):
        url = reverse('terminate-current-match')
        self.assertEqual(resolve(url).func, terminate_current_match_view)
