from django.urls import path
from .views import AnswerView, currentMatchView

urlpatterns = [
    path('answer/', AnswerView.as_view(), name='answer'),
    path('current-match/', currentMatchView, name='current-match'),
]
