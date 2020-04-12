from django.urls import path
from .consumers import PingPongConsumer

websocket_urlpatterns = [
    path("", PingPongConsumer),
]