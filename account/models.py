from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from django.contrib.gis.db import models # django.contrib.gis.db has additional features for GeoDjango
from django.contrib.gis.geos import Point
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator


class CustomUserManager(BaseUserManager):
    def create_user(
            self, username, email, first_name, last_name, password=None,
            commit=True):

        if not username:
            raise ValueError('Users must have an username')
        if not email:
            raise ValueError('Users must have an email address')
        if not first_name:
            raise ValueError('Users must have a first name')
        if not last_name:
            raise ValueError('Users must have a last name')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        if commit:
            user.save(using=self._db)
        return user

    def create_superuser(self, username, email, first_name, last_name, password):
        user = self.create_user(
            username,
            email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            commit=False,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField('username', max_length=30, unique=True)
    email = models.EmailField('email address', max_length=255, unique=True)
    first_name = models.CharField('first name', max_length=30)
    last_name = models.CharField('last name', max_length=150)
    is_active = models.BooleanField(
        'active',
        default=True,
        help_text=
        'Designates whether this user should be treated as active. '
        'Unselect this instead of deleting accounts.'
        ,
    )
    is_staff = models.BooleanField(
        'staff status',
        default=False,
        help_text=
        'Designates whether the user can log into this admin site.'
        ,
    )
    date_joined = models.DateTimeField(
        'date joined', default=timezone.now
    )
    location_range = models.IntegerField('location_range', default=3,
                                         validators=[MinValueValidator(1), MaxValueValidator(50)])
    # location_latitude = models.DecimalField('location_latitude', max_digits=11, decimal_places=9,
    #                                         null=True, validators=[MinValueValidator(0), MaxValueValidator(90)])
    # location_longitude = models.DecimalField('location_longitude', max_digits=11, decimal_places=9,
    #                                          null=True, validators=[MinValueValidator(0), MaxValueValidator(90)])
    
    location = models.PointField(geography=True, default=Point(0.0, 0.0)) # Instead of separate coordinates, use PointField
    
    location_timestamp = models.DateTimeField("location_timestamp", auto_now=False, auto_now_add=False, null=True)
    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def __str__(self):
        return '{} <{}>'.format(self.get_full_name(), self.email)

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
