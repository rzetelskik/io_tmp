from django.urls import path, include
from knox import views as knox_views
from .views import register, login, CustomUserDetailView, password_update, details_update, CustomUserListView


urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('user/', CustomUserDetailView.as_view(), name='custom-user-detail'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('password-update/', password_update, name='password-update'),
    path('details-update/', details_update, name='details-update'),
    path('list/', CustomUserListView.as_view()),
]