from django.urls import path
from .consumers import MatcherConsumer

websocket_urlpatterns = [
    path("", MatcherConsumer),
]