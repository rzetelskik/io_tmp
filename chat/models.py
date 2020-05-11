from django.db import models
from matcher.models import Match
from account.models import CustomUser
from django.utils import timezone


def validate_message(message):
    return message and message.strip()


class Message(models.Model):
    match = models.ForeignKey(Match, related_name='messages', on_delete=models.CASCADE)
    author = models.ForeignKey(CustomUser, related_name="messages_author", blank=False, null=False,
                               on_delete=models.CASCADE)
    content = models.TextField(validators=[validate_message, ])
    timestamp = models.DateTimeField(name="timestamp", default=timezone.now, db_index=True)
