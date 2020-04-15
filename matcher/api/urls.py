from django.urls import path
from .views import AnswerView, current_match_view, terminate_current_match_view

urlpatterns = [
    path('answer/', AnswerView.as_view(), name='answer'),
    path('current-match/', current_match_view, name='current-match'),
    path('terminate-current-match/', terminate_current_match_view, name='terminate-current-match'),
]
