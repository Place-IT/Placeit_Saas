from django.contrib.auth.decorators import login_required
from django.urls import path

from frontend_module.Views import DefaultVerifyReactView

urlpatterns = [

    path('profileImage_update/',login_required(DefaultVerifyReactView.as_view()),name="ProfileImage_update"),
    path('profileUpdate/',login_required(DefaultVerifyReactView.as_view()),name="ProfileUpdate"),
    path('password_reset/',login_required(DefaultVerifyReactView.as_view()),name="password_reset"),
    path('',login_required(DefaultVerifyReactView.as_view()),name="settings_landing"),
]
