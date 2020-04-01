from datetime import datetime

from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from django.contrib.auth import authenticate
from rest_framework import serializers
from account.models import CustomUser
from django.contrib.gis.geos import Point


class RegisterSerializer(serializers.ModelSerializer):
    password_repeat = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password_repeat']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password_repeat']:
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if not user or not user.is_active:
            raise serializers.ValidationError("Incorrect credentials provided.")
        return user


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name', 'location_range', 'date_joined']


class PasswordUpdateSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(style={'input_type': 'password'}, write_only=True, required=True)
    new_password_repeat = serializers.CharField(style={'input_type': 'password'}, write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['password', 'new_password', 'new_password_repeat']

    def validate_password(self, value):
        if not self.instance.check_password(value):
            raise serializers.ValidationError("Incorrect password")

        return value

    def validate(self, data):
        if data['new_password'] != data['new_password_repeat']:
            raise serializers.ValidationError("Passwords have to match.")

        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()

        return instance


class DetailsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'location_range']

    def validate(self, data):
        instance = self.instance

        if not (instance.first_name != data['first_name']
                or instance.last_name != data['last_name']
                or instance.location_range != data['location_range']):
            raise serializers.ValidationError("At least one field has to differ.")

        return data

    def update(self, instance, validated_data):
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.location_range = validated_data['location_range']

        instance.save()
        return instance


class CustomUserLocationSerializer(serializers.ModelSerializer):
    latitude = serializers.DecimalField(max_digits=11, decimal_places=9,
                                        min_value=0, max_value=90, write_only=True, required=True)
    longitude = serializers.DecimalField(max_digits=11, decimal_places=9,
                                         min_value=0, max_value=90, write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['latitude', 'longitude', 'location_timestamp']

    def update(self, instance, validated_data):
        instance.location = Point((validated_data['latitude'], validated_data['longitude']))
        instance.location_timestamp = validated_data['location_timestamp']

        instance.save()
        return instance
