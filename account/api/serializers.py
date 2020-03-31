from datetime import datetime
from django.utils import timezone
from django.contrib.auth import authenticate
from rest_framework import serializers
from account.models import CustomUser


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
    class Meta:
        model = CustomUser
        fields = ['location_latitude', 'location_longitude', 'location_timestamp']
        extra_kwargs = {
            'location_latitude': {'required': True},
            'location_longitude': {'required': True},
            'location_timestamp': {'read_only': True}
        }

    def update(self, instance, validated_data):
        instance.location_latitude = validated_data['location_latitude']
        instance.location_longitude = validated_data['location_longitude']
        instance.location_timestamp = datetime.now(tz=timezone.get_current_timezone())

        instance.save()
        return instance
