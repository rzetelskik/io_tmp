from django.utils import timezone
from matcher.models import Answer
from account.models import CustomUser
from django.test import TestCase
from django.contrib.gis.db import models
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError

class AnswerTests(TestCase):

    def setUp(self):
        self.u1 = CustomUser.objects.create(username="jk", email="jan@kowal.ski",
                                        first_name="jan", last_name="kowalski",
                                        password="jankow", location_timestamp=timezone.now())

        self.u2 = CustomUser.objects.create(username="pn", email="piotr@no.wak",
                                        first_name="piotr", last_name="nowak",
                                        password="piopio", location_timestamp=timezone.now())

        self.u3 = CustomUser.objects.create(username="jk2", email="jann@kowal.ski",
                                        first_name="jann", last_name="kowalski",
                                        password="jannkow", location_timestamp=timezone.now())

        self.u4 = CustomUser.objects.create(username="pnn", email="piotr@nno.wak",
                                        first_name="piotr", last_name="nnowak",
                                        password="piopio", location_timestamp=timezone.now())

    def test_simple(self):
        ans = Answer.objects.create(sender=self.u1, recipient=self.u2, agreed=True)
        ans.full_clean()

    def test_str(self):
        ans1 = Answer.objects.create(sender=self.u1, recipient=self.u2, agreed=True)
        self.assertEqual("jk ACCEPTED pn", ans1.__str__())

    def test_unique_pair(self):
        ans1 = Answer.objects.create(sender=self.u1, recipient=self.u2, agreed=True)

        with self.assertRaises(Exception) as raised:
            Answer.objects.create(sender=self.u1, recipient=self.u2, agreed=False)
        self.assertEqual(IntegrityError, type(raised.exception))

    def test_no_sender(self):
        ans1 = Answer.objects.create(sender=self.u1, recipient=self.u2, agreed=True)
        ans1.sender = None
        self.assertRaises(ValidationError, ans1.full_clean)

    def test_no_recipient(self):
        ans1 = Answer.objects.create(sender=self.u1, recipient=self.u2, agreed=True)
        ans1.recipient = None
        self.assertRaises(ValidationError, ans1.full_clean)

    def test_no_agreed(self):
        ans1 = Answer.objects.create(sender=self.u1, recipient=self.u2, agreed=True)
        ans1.agreed = None
        self.assertRaises(ValidationError, ans1.full_clean)

    def test_save(self):
        ans1 = Answer.objects.create(sender=self.u1, recipient=self.u2, agreed=True)
        ans1.save()

        ans2 = Answer.objects.create(sender=self.u3, recipient=self.u4, agreed=False)
        ans2.save()
