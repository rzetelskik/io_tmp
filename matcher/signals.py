from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Match


def notify_user(channel_layer, user):
    notification = {"type": "match.notification"}
    user_group = "user_{}".format(user)
    async_to_sync(channel_layer.group_send)(user_group, notification)

@receiver(post_save, sender=Match)
def my_callback(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        notify_user(channel_layer, instance.user1.username)
        notify_user(channel_layer, instance.user2.username)

