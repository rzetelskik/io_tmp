from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from .models import Match


def notify_user(channel_layer, user, type):
    notification = {"type": type}
    user_group = "user_{}".format(user)
    async_to_sync(channel_layer.group_send)(user_group, notification)


@receiver(post_save, sender=Match)
def match_created_callback(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        msg_type = "match.created.notification"
        notify_user(channel_layer, instance.user1.username, msg_type)
        notify_user(channel_layer, instance.user2.username, msg_type)


@receiver(post_delete, sender=Match)
def match_deleted_callback(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    msg_type = "match.deleted.notification"
    notify_user(channel_layer, instance.user1.username, msg_type)
    notify_user(channel_layer, instance.user2.username, msg_type)
