from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from matcher.routing import websocket_urlpatterns as matcher_urlpatterns
from chat.routing import websocket_urlpatterns as chat_urlpatterns
from .auth_middleware import TokenAuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

websocket_urlpatterns = [
    re_path(r'^ws/matcher/', URLRouter(matcher_urlpatterns)),
    re_path(r'^ws/chat/', URLRouter(chat_urlpatterns))
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
