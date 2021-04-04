from django.urls import path
from rest_framework_jwt.views import verify_jwt_token, refresh_jwt_token
from . import views

urlpatterns = [
    path('create', views.CreateAPI.as_view()),
    path('login', views.LoginAPI.as_view()),
    path('verify', verify_jwt_token),
    path('refresh', refresh_jwt_token),
]
