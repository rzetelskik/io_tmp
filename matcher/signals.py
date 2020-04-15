from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Match


def notify_user(channel_layer, user, type):
    print("notifying user {}".format(user))
    notification = {"type": type}
    user_group = "user_{}".format(user)
    async_to_sync(channel_layer.group_send)(user_group, notification)
    print("notified user {}".format(user))


@receiver(post_save, sender=Match)
def match_created_callback(sender, instance, created, **kwargs):
    print("match_created_callback for users {} {}".format(instance.user1, instance.user2))
    update_fields = kwargs['update_fields']

    channel_layer = get_channel_layer()
    if created:
        msg_type = "match.created.notification"
    elif update_fields and 'time_end' in update_fields and instance.time_end:
        msg_type = "match.deleted.notification"
    else:
        return

    notify_user(channel_layer, instance.user1.username, msg_type)
    notify_user(channel_layer, instance.user2.username, msg_type)

    print("finished notifying users from match_created_callback")
