from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from .auth_middleware import TokenAuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from .consumers import Consumer

application = ProtocolTypeRouter({
    'websocket': AllowedHostsOriginValidator(
        TokenAuthMiddlewareStack(
            URLRouter([
                re_path(r'^ws/', Consumer),
            ])
        )
    )
})
