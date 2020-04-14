from django.urls import path
from .views import AnswerView, CurrentMatchView

urlpatterns = [
    path('answer/', AnswerView.as_view(), name='answer'),
    path('current-match/', CurrentMatchView.as_view(), name='current-match'),
]
