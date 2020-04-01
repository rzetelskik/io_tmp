from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import CustomUser

admin.site.register(CustomUser, OSMGeoAdmin)
