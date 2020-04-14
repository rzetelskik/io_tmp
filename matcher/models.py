from django.db import models
from account.models import CustomUser
from django.utils import timezone


class Answer(models.Model):
    sender = models.ForeignKey(CustomUser, related_name='sender', on_delete=models.CASCADE)
    recipient = models.ForeignKey(CustomUser, related_name='recipient', on_delete=models.CASCADE)
    agreed = models.BooleanField(name='agreed')
    timestamp = models.DateTimeField(name='timestamp', default=timezone.now)


class Match(models.Model):
    user1 = models.ForeignKey(CustomUser, related_name='user1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(CustomUser, related_name='user2', on_delete=models.CASCADE)
    time_start = models.DateTimeField(name='time_start', default=timezone.now)
    time_end = models.DateTimeField(name='time_end', auto_now=False, auto_now_add=False, null=True)
