from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Match
from communicate.consumers import notify_user

@receiver(post_save, sender=Match)
def match_created_callback(sender, instance, created, **kwargs):
    update_fields = kwargs['update_fields']

    if created:
        msg_type = "match.created.notification"
    elif update_fields and 'time_end' in update_fields and instance.time_end:
        msg_type = "match.deleted.notification"
    else:
        return

    notify_user(instance.user1.username, msg_type, instance.pk)
    notify_user(instance.user2.username, msg_type, instance.pk)
