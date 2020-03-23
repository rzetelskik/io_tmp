from django.urls import re_path, include

urlpatterns = [
    re_path(r'^api/account/', include('account.api.urls')),
]