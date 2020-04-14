from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from matcher.routing import websocket_urlpatterns as matcher_urlpatterns
from .auth_middleware import TokenAuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

websocket_urlpatterns = [
    path("ws/matcher/", URLRouter(matcher_urlpatterns)),
]

application = ProtocolTypeRouter({
    'websocket': AllowedHostsOriginValidator(
        TokenAuthMiddlewareStack(
            URLRouter(
                websocket_urlpatterns
            )
        )
    )
})
