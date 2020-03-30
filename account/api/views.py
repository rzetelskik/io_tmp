from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from knox.models import AuthToken
from .serializers import CustomUserSerializer, RegisterSerializer, LoginSerializer, PasswordUpdateSerializer, \
    DetailsUpdateSerializer
from account.models import CustomUser


@api_view(['POST', ])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = AuthToken.objects.create(user)[1]  # getting the actual token, not an object
    response_data['response'] = 'Successfully created a new user.'
    response_data['token'] = token

    user_serializer = CustomUserSerializer(user)
    response_data['user'] = user_serializer.data

    return Response(response_data)


@api_view(['POST', ])
def login(request):
    serializer = LoginSerializer(data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    token = AuthToken.objects.create(user)[1]  # getting the actual token, not an object
    response_data['response'] = 'Successfully logged in.'
    response_data['token'] = token

    user_serializer = CustomUserSerializer(user)
    response_data['user'] = user_serializer.data

    return Response(response_data)


class CustomUserDetailView(generics.RetrieveAPIView):
    api_view = ['GET', ]
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user


@api_view(['PUT', ])
@permission_classes([permissions.IsAuthenticated])
def password_update(request):
    serializer = PasswordUpdateSerializer(request.user, data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    serializer.save()
    response_data['response'] = 'Password successfully changed.'

    return Response(response_data)


@api_view(['PUT', ])
@permission_classes([permissions.IsAuthenticated])
def details_update(request):
    serializer = DetailsUpdateSerializer(request.user, data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    serializer.save()
    response_data['response'] = 'Account details successfully updated.'

    return Response(response_data)
