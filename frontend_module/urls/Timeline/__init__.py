from django.contrib.auth.decorators import login_required
from django.urls import path

from frontend_module.Views import DefaultVerifyReactView, StudentorNot, FormView

urlpatterns = [
    path('',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[StudentorNot])),name="Timeline"),
    path('previous_submitted_post/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[StudentorNot])),name="previous_submitted_post"),
    path('<int:pk>/',login_required(FormView.as_view(condition_check_Function=[StudentorNot])),name="Timeline"),
]
