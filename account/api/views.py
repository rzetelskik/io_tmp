from datetime import timedelta
from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from knox.models import AuthToken
from django.db.models import Q, F, Value, DateTimeField, DurationField, ExpressionWrapper, Count
from django.utils import timezone
from django.contrib.gis.db.models.functions import Distance
from .serializers import CustomUserSerializer, RegisterSerializer, LoginSerializer, PasswordUpdateSerializer, \
    DetailsUpdateSerializer, CustomUserLocationSerializer, MatchingCustomUserSerializer, TagsUpdateSerializer
from account.models import CustomUser
from matcher.models import Answer, Match



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


@api_view(['PUT', ])
@permission_classes([permissions.IsAuthenticated])
def tags_update(request):
    serializer = TagsUpdateSerializer(instance=request.user, data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    serializer.save()
    response_data['response'] = 'User tags updated successfully.'

    return Response(response_data)


@api_view(['PUT', ])
@permission_classes([permissions.IsAuthenticated])
def custom_user_location_update(request):
    serializer = CustomUserLocationSerializer(instance=request.user, data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    serializer.save()
    response_data['response'] = 'User\'s location updated successfully.'
    return Response(response_data)


class ListMatchingUsersView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = MatchingCustomUserSerializer

    # Returns queryset of 10 users.
    # Each of them has shared his localization within a circle of
    # radius equal to user's location_range, not earlier then 1 hour ago.
    # Currently matched or answered users are excluded.
    def get_queryset(self):
        # TODO(?) checking timestamp of self.request.user

        user = self.request.user
        point = user.location
        radius = user.location_range

        # pk's of users that have been answered by sender
        answered_pk = Answer.objects.filter(sender=user).values_list('recipient')
        
        # pk's of users that are currently matched and are on first position in match
        matched_user1_pk = Match.objects.filter(time_end__isnull=True).values_list('user1')
        
        # pk's of users that are currently matched and are on second position in match
        matched_user2_pk = Match.objects.filter(time_end__isnull=True).values_list('user2')

        # Users that are not in any of those ^
        not_answered_and_not_matched = CustomUser.objects.filter(
            ~Q(pk__in=answered_pk),
            ~Q(pk__in=matched_user1_pk),
            ~Q(pk__in=matched_user2_pk)
        )

        delta = timedelta(seconds=3600)
        delta_expression = Value(timezone.now()) - F('location_timestamp')

        return not_answered_and_not_matched.annotate(
            delta=ExpressionWrapper(delta_expression, DurationField()),
            distance=Distance('location', point)
        ).filter(
            ~Q(pk=user.pk),
            Q(distance__lte=radius * 1000),
            Q(distance__lte=F('location_range') * 1000),
            delta__lte=delta,
            tags__in=user.tags.all()
        ).annotate(
            tags_count=Count('tags')
        ).order_by('-tags_count')
