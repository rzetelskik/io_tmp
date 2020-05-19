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


class CurrentMatchSerializer(serializers.Serializer):
    match_id = serializers.ReadOnlyField()
    first_name = serializers.CharField(max_length=30)
    distance = serializers.DecimalField(max_digits=5, decimal_places=2)
    match_timestamp = serializers.DateTimeField()
    common_tags = serializers.ListField(
        child=serializers.CharField()
    )


class TerminatedMatchSerializer(serializers.ModelSerializer):
    match_id = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    common_tags = serializers.SerializerMethodField()

    def get_match_id(self, obj):
        return obj.pk

    def get_first_name(self, obj):
        user = self.context['request'].user
        matched_user = obj.user1 if obj.user2 == user else obj.user2
        return matched_user.first_name

    def get_common_tags(self, obj):
        return [tag.name for tag in obj.common_tags.all()]


    class Meta:
        model = Match
        fields = ['match_id', 'first_name', 'time_start', 'time_end', 'common_tags']
