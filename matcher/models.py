from django.db import models
from account.models import CustomUser
from django.utils import timezone


class Answer(models.Model):
    sender = models.ForeignKey(CustomUser, name='sender', related_name='sender', on_delete=models.CASCADE)
    recipient = models.ForeignKey(CustomUser, name='recipient', related_name='recipient', on_delete=models.CASCADE)
    agreed = models.BooleanField(name='agreed')
    timestamp = models.DateTimeField(name='timestamp', default=timezone.now)

    class Meta:
        unique_together = ['sender', 'recipient']

    def __str__(self):
        return '{} {} {}'.format(self.sender.username, "ACCEPTED" if self.agreed else "REJECTED",
                                 self.recipient.username)

    def save(self, *args, **kwargs):
        if not self.agreed:
            super(Answer, self).save(*args, **kwargs)
            return

        try:
            matched = Answer.objects.get(sender=self.recipient, recipient=self.sender, agreed=True)
            matched.delete()
            Match.objects.get_or_create(user1=self.sender, user2=self.recipient)
            print("created match")
        except Answer.DoesNotExist:
            super(Answer, self).save(*args, **kwargs)
            print("created a new answer {}".format(self.__str__()))


class Match(models.Model):
    user1 = models.ForeignKey(CustomUser, related_name='user1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(CustomUser, related_name='user2', on_delete=models.CASCADE)
    time_start = models.DateTimeField(name='time_start', default=timezone.now)
    time_end = models.DateTimeField(name='time_end', auto_now=False, auto_now_add=False, null=True, blank=True)

    def terminate(self):
        if not self.time_end:
            self.time_end = timezone.now()
            self.save(update_fields=['time_end'])
