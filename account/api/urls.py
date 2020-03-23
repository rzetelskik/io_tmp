from django.urls import path, include
from knox import views as knox_views
from .views import registerView, loginView, CustomUserDetailView, passwordUpdateView, detailsUpdateView, CustomUserListView


urlpatterns = [
    path('register/', registerView),
    path('login/', loginView),
    path('user/', CustomUserDetailView.as_view()),
    path('logout/', knox_views.LogoutView.as_view()),
    path('password-update/', passwordUpdateView),
    path('details-update/', detailsUpdateView),
    path('list/', CustomUserListView.as_view()),
]