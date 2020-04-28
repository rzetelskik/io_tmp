from django.utils import timezone
from account.models import CustomUser
from django.test import TestCase
from django.contrib.gis.db import models
from django.core.exceptions import ValidationError

class CustomUserTests(TestCase):

    def get_string_of_length(self, n):
        str = ""
        for i in range(n):
            str = str + "a"
        return str

    def setUp(self):
        self.user1 = CustomUser.objects.create(username="jk", email="jan@kowal.ski",
                                        first_name="jan", last_name="kowalski",
                                        password="jankow", location_timestamp=timezone.now())

    """Basic tests for methods"""
    def test_get_full_name(self):
        self.assertEqual(self.user1.get_full_name(), "jan kowalski")

    def test_str(self):
        self.assertEqual(self.user1.__str__(), "jan kowalski <jan@kowal.ski>")

    def test_longitude(self):
        self.assertEqual(self.user1.longitude, 0.0)

    def test_latitude(self):
        self.assertEqual(self.user1.latitude, 0.0)

    """Tests for edge cases"""
    def test_location_range_min(self):
        # default value
        self.assertEqual(self.user1.location_range, 3)

        # 1 is a valid value
        self.user1.location_range = 1
        self.assertEqual(self.user1.location_range, 1)
        self.user1.full_clean()

        # 0 is not a valid value
        self.user1.location_range = 0
        self.assertRaises(ValidationError, self.user1.full_clean)

    def test_location_range_max(self):
        # default value
        self.assertEqual(self.user1.location_range, 3)

        # 50 is a valid value
        self.user1.location_range = 50
        self.assertEqual(self.user1.location_range, 50)
        self.user1.full_clean()

        # 51 is not a valid value
        self.user1.location_range = 51
        self.assertRaises(ValidationError, self.user1.full_clean)

    def test_username_length(self):
        self.user1.full_clean()
        
        # length 30 is valid
        self.user1.username = self.get_string_of_length(30)
        self.user1.full_clean()

    def test_first_name_length(self):
        self.user1.full_clean()
        
        # length 30 is valid
        self.user1.first_name = self.get_string_of_length(30)
        self.user1.full_clean()

    def test_last_name_length(self):
        self.user1.full_clean()
        
        # length 150 is valid
        self.user1.last_name = self.get_string_of_length(150)
        self.user1.full_clean()

    def test_email_length(self):
        self.user1.full_clean()
        
        # length 255 is valid
        str = self.get_string_of_length(250)
        str = str + "@a.cd"
        self.assertEqual(len(str), 255)
        self.user1.email = str
        self.user1.full_clean()

    """Test for required values"""
    def test_required_values(self):
        # username
        user2 = self.user1
        user2.username = None
        self.assertRaises(ValidationError, user2.full_clean)

        # first name
        user2 = self.user1
        user2.first_name = None
        self.assertRaises(ValidationError, user2.full_clean)

        # last name
        user2 = self.user1
        user2.last_name = None
        self.assertRaises(ValidationError, user2.full_clean)

        # email
        user2 = self.user1
        user2.email = None
        self.assertRaises(ValidationError, user2.full_clean)

    """Tests for unique values"""
    def test_unique_username(self):
        user2 = CustomUser.objects.create(username="some_username", email="my@e.mail")
        user3 = CustomUser.objects.create(username="some_username2", email="your@e.mail")
        user3.validate_unique()
        user3.username = "some_username"
        self.assertRaises(ValidationError, user3.validate_unique)

    def test_unique_email(self):
        user2 = CustomUser.objects.create(username="some_username", email="my@e.mail")
        user3 = CustomUser.objects.create(username="some_username2", email="your@e.mail")
        user3.validate_unique()
        user3.email = "my@e.mail"
        self.assertRaises(ValidationError, user3.validate_unique)
