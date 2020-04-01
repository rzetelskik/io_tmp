from datetime import timedelta
from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from knox.models import AuthToken
from django.db.models import Q, F, Value, DateTimeField, DurationField, ExpressionWrapper
from django.utils import timezone
from django.contrib.gis.measure import Distance
from .serializers import CustomUserSerializer, RegisterSerializer, LoginSerializer, PasswordUpdateSerializer, \
    DetailsUpdateSerializer, CustomUserLocationSerializer
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
    response_data['response'] = 'Logged in successfully.'
    response_data['token'] = token

    user_serializer = CustomUserSerializer(user)
    response_data['user'] = user_serializer.data

    return Response(response_data)


class CustomUserDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user


@api_view(['PUT', ])
@permission_classes([permissions.IsAuthenticated])
def password_update(request):
    serializer = PasswordUpdateSerializer(instance=request.user, data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    serializer.save()
    response_data['response'] = 'Password changed successfully.'

    return Response(response_data)


@api_view(['PUT', ])
@permission_classes([permissions.IsAuthenticated])
def details_update(request):
    serializer = DetailsUpdateSerializer(instance=request.user, data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    serializer.save()
    response_data['response'] = 'User details updated successfully.'

    return Response(response_data)


class CustomUserLocationView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = CustomUserLocationSerializer

    def get_object(self):
        return self.request.user


class ListMatchingUsersView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = CustomUserSerializer
    
    # Returns queryset of 10 users.
    # Each of them has shared his localization within a circle of
    # radius equal to user's location_range, not earlier then 1 hour ago.
    def get_queryset(self):

        # TODO(?) checking timestamp of self.request.user

        point = self.request.user.location
        radius = self.request.user.location_range
        
        delta = timedelta(seconds=3600)
        delta_expression = Value(timezone.now()) - F('location_timestamp')

        return CustomUser.objects.annotate(
            delta=ExpressionWrapper(delta_expression, DurationField())  
        ).filter(
            ~Q(pk=self.request.user.pk),
            delta__lte=delta,
            location__distance_lte=(point, Distance(km=radius))
        )[:10]
