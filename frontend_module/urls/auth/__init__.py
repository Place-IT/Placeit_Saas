from django.urls import path, include

from frontend_module.Views import BaseReactView, DefaultVerifyReactView, Notauth
from django.contrib.auth.decorators import login_required ,user_passes_test
from .UserSettings import urlpatterns as Setting_urlpattern

urlpatterns = [
    path('login/',BaseReactView.as_view(condition_check_Function=[Notauth]),name="Login"),
    path('signup/',DefaultVerifyReactView.as_view(condition_check_Function=[Notauth]),name="signup"),

    path('profile/',login_required(DefaultVerifyReactView.as_view(template_name="Profile\profile.html")),name="profile"),

    # path('verify/',login_required(BaseReactView.as_view()),name="verify"),

    path('forgotPassword/',BaseReactView.as_view(),name="reset-password-email-enter-frontend"),
    path('forgotPasswordReset/',BaseReactView.as_view(),name="reset-password-confirm-frontend"),

    path('emailverifysent/',BaseReactView.as_view(),name="emailverifysent"),
    path('emailverifyconform/',BaseReactView.as_view(),name="emailverifyconform"),

    path('settings/',include(Setting_urlpattern),name="settings"),
]



