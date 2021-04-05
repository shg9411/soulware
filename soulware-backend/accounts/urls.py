from django.urls import path
from rest_framework_jwt.views import refresh_jwt_token
from . import views

urlpatterns = [
    path('create', views.CreateAPI.as_view()),
    path('login', views.LoginAPI.as_view()),
    path('refresh', refresh_jwt_token),
]
