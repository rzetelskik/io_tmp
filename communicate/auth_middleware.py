from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from rest_framework import HTTP_HEADER_ENCODING
from django.contrib.auth.models import AnonymousUser
from django.db import close_old_connections
from urllib.parse import parse_qs
from knox.auth import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed


@database_sync_to_async
def get_user(query_params):
    close_old_connections()
    knox_auth = TokenAuthentication()
    try:
        token = query_params.get('token', (None,))[0]
        user, auth_token = knox_auth.authenticate_credentials(token.encode(HTTP_HEADER_ENCODING))
        return user
    except AuthenticationFailed:
        return AnonymousUser()


class TokenAuthMiddleware:

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return TokenAuthMiddlewareInstance(scope, self)


class TokenAuthMiddlewareInstance:
    def __init__(self, scope, middleware):
        self.middleware = middleware
        self.scope = scope
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):
        params = parse_qs(self.scope['query_string'].decode('utf8'))
        if 'token' in params:
            self.scope['user'] = await get_user(params)

        inner = self.inner(self.scope)
        return await inner(receive, send)


def TokenAuthMiddlewareStack(inner):
    return TokenAuthMiddleware(AuthMiddlewareStack(inner))
