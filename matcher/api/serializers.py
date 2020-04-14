from rest_framework import serializers
from matcher.models import Answer, Match
from account.models import CustomUser


class AnswerSerializer(serializers.ModelSerializer):
    recipient = serializers.SlugRelatedField(slug_field='username', queryset=CustomUser.objects.all(), many=False,
                                             required=True)

    class Meta:
        model = Answer
        fields = ['recipient', 'agreed']

    def create(self, validated_data):
        user = self.context['request'].user
        recipient = validated_data['recipient']
        agreed = validated_data['agreed']

        answer = Answer.objects.create(sender_id=user.pk, recipient_id=recipient.pk, agreed=agreed)

        return answer
