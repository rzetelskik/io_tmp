from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import CustomUser, Tag

admin.site.register(CustomUser, OSMGeoAdmin)
admin.site.register(Tag)