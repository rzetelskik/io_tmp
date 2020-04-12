from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from matcher.routing import websocket_urlpatterns as matcher_urlpatterns

websocket_urlpatterns = [
    path("ws/matcher/", URLRouter(matcher_urlpatterns)),
]

application = ProtocolTypeRouter({
    'websocket': URLRouter(
            websocket_urlpatterns
        )
})