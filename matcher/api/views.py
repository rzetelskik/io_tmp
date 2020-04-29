from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import AnswerSerializer, CurrentMatchSerializer
from account.models import CustomUser
from matcher.models import Match
from django.db.models import Q
from django.contrib.gis.db.models.functions import Distance


class AnswerView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AnswerSerializer


class CurrentMatchData:
    def __init__(self, first_name, distance, match_timestamp, common_tags):
        self.first_name = first_name
        self.distance = distance
        self.match_timestamp = match_timestamp
        self.common_tags = common_tags


def get_current_match(user):
    return Match.objects.filter(time_end__isnull=True).get(Q(user1=user) | Q(user2=user))


@api_view(['GET', ])
@permission_classes([permissions.IsAuthenticated])
def current_match_view(request):
    user = request.user
    point = user.location

    try:
        match = get_current_match(user)
    except Match.DoesNotExist:
        return Response({'response': 'User has no current meeting.'})

    matched_user = match.user1 if match.user2 == user else match.user2

    distance = CustomUser.objects.annotate(
        distance=Distance('location', point)
    ).get(pk=matched_user.pk).distance.km

    common_tags = user.tags.all() & matched_user.tags.all()

    data = CurrentMatchData(
        first_name=matched_user.first_name,
        distance=distance,
        match_timestamp=match.time_start,
        common_tags=[tag.name for tag in common_tags]
    )

    serializer = CurrentMatchSerializer(data)
    return Response(serializer.data)


@api_view(['POST', ])
@permission_classes([permissions.IsAuthenticated])
def terminate_current_match_view(request):
    user = request.user
    response_data = {}

    try:
        match = get_current_match(user)
        match.terminate()
        response_data['response'] = 'Current meeting has been terminated.'
    except Match.DoesNotExist:
        response_data['response'] = 'User has no current meeting.'
    finally:
        return Response(response_data)
