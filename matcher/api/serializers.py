from rest_framework import serializers
from matcher.models import Answer, Match
from account.models import CustomUser


class AnswerSerializer(serializers.ModelSerializer):
    recipient = serializers.SlugRelatedField(slug_field='username', read_only=True)

    class Meta:
        model = Answer
        fields = ['recipient', 'agreed']

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        print(self.context['request'].user)


