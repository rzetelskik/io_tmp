from django.utils import timezone
from account.models import CustomUser
from django.test import TestCase
from django.contrib.gis.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.gis.geos import Point
from account.api.serializers import CustomUserSerializer, RegisterSerializer, LoginSerializer, PasswordUpdateSerializer, \
    DetailsUpdateSerializer, CustomUserLocationSerializer, MatchingCustomUserSerializer
import datetime
from django.utils.dateparse import parse_datetime
import copy

# TODO: 
# CustomUserLocationSerializer(serializers.ModelSerializer):
# DetailsUpdateSerializer(serializers.ModelSerializer):
# LoginSerializer(serializers.Serializer):

class CustomUserSerializerTests(TestCase):
    def setUp(self):
        self.CustomUserAtt = {
            'username': 'jk',
            'email': 'jan@kowal.ski',
            'first_name': 'jan',
            'last_name': 'kowalski',
            'location_range': 3,
            'date_joined': timezone.now()
        }

        self.user = CustomUser.objects.create(**self.CustomUserAtt)
        self.serializer = CustomUserSerializer(instance=self.user)

    def test_contains_expected_fields(self):
        expected_fields = ['username', 'email', 'first_name', 'last_name',
                            'location_range', 'date_joined']
        self.assertEqual(set(self.serializer.data.keys()), set(expected_fields))
    
    def test_field_content(self):
        data = self.serializer.data

        self.assertEqual(data['username'], self.CustomUserAtt['username'])
        self.assertEqual(data['email'], self.CustomUserAtt['email'])
        self.assertEqual(data['first_name'], self.CustomUserAtt['first_name'])
        self.assertEqual(data['last_name'], self.CustomUserAtt['last_name'])
        self.assertEqual(data['location_range'], self.CustomUserAtt['location_range'])
        self.assertEqual(parse_datetime(data['date_joined']), self.CustomUserAtt['date_joined'])

class RegisterSerializerTests(TestCase):
    def setUp(self):
        self.RegisterAtt = {
            'username': 'jk',
            'email': 'jan@kowal.ski',
            'first_name': 'jan',
            'last_name': 'kowalski',
            'password': 'psw',
            'password_repeat': 'psw'
        }

        self.serializer = RegisterSerializer(data=self.RegisterAtt)
    
    def test_contains_expected_fields(self):
        expected_fields = ['username', 'email', 'first_name', 'last_name']
        
        self.serializer.is_valid()
        self.assertEqual(set(self.serializer.data.keys()), set(expected_fields))

    def test_correct_validation(self):
        self.RegisterAtt2 = copy.copy(self.RegisterAtt)
        self.RegisterAtt2['password_repeat'] = 'psw2'
        self.serializer2 = RegisterSerializer(data=self.RegisterAtt2)

        self.serializer.is_valid()
        self.serializer2.is_valid()

        self.assertEqual(set(self.serializer2.errors), set(['non_field_errors']))
        self.assertEqual(set(self.serializer.errors), set([]))

    def test_field_content(self):
        self.serializer.is_valid()
        data = self.serializer.data

        self.assertEqual(data['username'], self.RegisterAtt['username'])
        self.assertEqual(data['email'], self.RegisterAtt['email'])
        self.assertEqual(data['first_name'], self.RegisterAtt['first_name'])
        self.assertEqual(data['last_name'], self.RegisterAtt['last_name'])

class LoginSerializerTest(TestCase):
    def setUp(self):
        self.RegisterAtt = {
            'username': 'jk',
            'email': 'jan@kowal.ski',
            'first_name': 'jan',
            'last_name': 'kowalski',
            'password': 'psw',
            'password_repeat': 'psw'
        }

        self.LoginAtt = {
            'username': 'jk',
            'password': 'psw',
        }

        self.serializer = LoginSerializer(data=self.LoginAtt)
        self.RegSerializer = RegisterSerializer(data=self.RegisterAtt)
        self.RegSerializer.is_valid()
        self.created_user = self.RegSerializer.save()

    def test_contains_expected_fields(self):
        expected_fields = ['username', 'password']
        
        self.serializer.is_valid()
        self.assertEqual(set(self.serializer.data.keys()), set(expected_fields))

    def test_validation(self):
        self.LoginAtt2 = copy.copy(self.LoginAtt)
        self.LoginAtt3 = copy.copy(self.LoginAtt)
        self.LoginAtt2['password'] = 'pws'
        self.LoginAtt3['username'] = 'jp'
        self.serializer2 = LoginSerializer(data=self.LoginAtt2)
        self.serializer3 = LoginSerializer(data=self.LoginAtt3)

        self.serializer.is_valid()
        self.serializer2.is_valid()
        self.serializer3.is_valid()

        self.assertEqual(set(self.serializer.errors), set([]))
        self.assertEqual(set(self.serializer2.errors), set(['non_field_errors']))
        self.assertEqual(set(self.serializer3.errors), set(['non_field_errors']))

class PasswordUpdateSerializerTest(TestCase):
    def setUp(self):
        self.RegisterAtt = {
            'username': 'jk',
            'email': 'jan@kowal.ski',
            'first_name': 'jan',
            'last_name': 'kowalski',
            'password': 'psw',
            'password_repeat': 'psw'
        }

        self.NewPasswordAtt = {
            'password': 'psw',
            'new_password': 'pws',
            'new_password_repeat': 'pws'
        }

        self.RegSerializer = RegisterSerializer(data=self.RegisterAtt)
        self.RegSerializer.is_valid()
        self.created_user = self.RegSerializer.save()
        self.serializer = PasswordUpdateSerializer(data=self.NewPasswordAtt, instance=self.created_user)

    def test_validation_password(self):
        self.NewPasswordAtt2 = copy.copy(self.NewPasswordAtt)
        self.NewPasswordAtt2['password'] = 'incorect'
        self.serializer2 = PasswordUpdateSerializer(data=self.NewPasswordAtt2, instance=self.created_user)

        self.serializer.is_valid()
        self.serializer2.is_valid()

        self.assertEqual(set(self.serializer.errors), set([]))
        self.assertEqual(set(self.serializer2.errors), set(['password']))

    def test_validation(self):
        self.NewPasswordAtt2 = copy.copy(self.NewPasswordAtt)
        self.NewPasswordAtt3 = copy.copy(self.NewPasswordAtt)
        self.NewPasswordAtt2['new_password'] = 'incorect'
        self.NewPasswordAtt3['new_password'] = 'psw'
        self.NewPasswordAtt3['new_password_repeat'] = 'psw'
        self.serializer2 = PasswordUpdateSerializer(data=self.NewPasswordAtt2, instance=self.created_user)
        self.serializer3 = PasswordUpdateSerializer(data=self.NewPasswordAtt3, instance=self.created_user)

        self.serializer.is_valid()
        self.serializer2.is_valid()
        self.serializer3.is_valid()

        self.assertEqual(set(self.serializer.errors), set([]))
        self.assertEqual(set(self.serializer2.errors), set(['non_field_errors']))
        self.assertEqual(set(self.serializer3.errors), set([]))