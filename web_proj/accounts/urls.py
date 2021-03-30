from django.urls import path

from . import views

urlpatterns = [
    path('create/', views.CreateAPI.as_view()),
    path('login/', views.LoginAPI.as_view()),
]
