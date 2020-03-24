from .views import FrontendAppView
from django.urls import path

urlpatterns = [
    path('', FrontendAppView.as_view(), name='frontend'),
]
