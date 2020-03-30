from django.contrib.auth import authenticate

from rest_framework import serializers

from account.models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        password = validated_data['password']
        password2 = validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'passwords must match'})

        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        else:
            raise serializers.ValidationError("Incorrect credentials provided.")


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name', 'location_range', 'date_joined']


class PasswordUpdateSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password3 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['password1', 'password2', 'password3']

    def update(self, instance, validated_data):
        if not instance.check_password(validated_data['password1']):
            raise serializers.ValidationError("{'password1': 'Incorrect password'}")

        password2 = validated_data['password2']
        password3 = validated_data['password3']

        if password2 != password3:
            raise serializers.ValidationError("Passwords have to match.")

        instance.set_password(password2)
        instance.save()

        return instance


class DetailsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'location_range']

    def update(self, instance, validated_data):
        if not (instance.first_name != validated_data['first_name']
                or instance.last_name != validated_data['last_name']
                or instance.location_range != validated_data['location_range']):
            raise serializers.ValidationError("At least one field has to differ.")

        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.location_range = validated_data['location_range']

        instance.save()
        return instance
