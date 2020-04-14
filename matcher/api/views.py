from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import AnswerSerializer


class AnswerView(CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = AnswerSerializer


