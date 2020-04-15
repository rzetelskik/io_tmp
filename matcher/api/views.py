from rest_framework import permissions, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import AnswerSerializer, CurrentMatchSerializer
from account.models import CustomUser
from matcher.models import Match
from django.db.models import Q
from django.contrib.gis.db.models.functions import Distance


class AnswerView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = AnswerSerializer


class CurrentMatchData:
    def __init__(self, first_name, distance, match_timestamp):
        self.first_name = first_name
        self.distance = distance
        self.match_timestamp = match_timestamp


@api_view(['GET', ])
@permission_classes([permissions.IsAuthenticated])
def currentMatchView(request):
    user = request.user
    point = user.location
        
    match = Match.objects.filter(time_end__isnull=True).get(Q(user1=user) | Q(user2=user))

    matched_user = match.user1 if match.user2 == user else match.user2
        
    distance = CustomUser.objects.annotate(
        distance=Distance('location', point)
    ).get(pk=matched_user.pk).distance.km

    data = CurrentMatchData(
        first_name=matched_user.first_name, 
        distance=distance, 
        match_timestamp=match.time_start
    )

    serializer = CurrentMatchSerializer(data)
    return Response(serializer.data)

    
        
    




