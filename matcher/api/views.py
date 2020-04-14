from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import AnswerSerializer, CurrentMatchSerializer


class AnswerView(CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = AnswerSerializer


class CurrentMatchView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = CurrentMatchSerializer


