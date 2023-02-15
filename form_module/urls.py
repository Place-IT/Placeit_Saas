from django.urls import path
from rest_framework import routers
from .Views import Form_viewset, Additional_Response_viewset, Form_Response_To_User_viewset, Questions_viewset, \
    Response_to_form_viewset, Stats_viewset

router = routers.DefaultRouter()

router.register(r'Form/Form', Form_viewset, basename="Form")
router.register(r'Form/Additional_Response', Additional_Response_viewset, basename="Additional Response from User")
router.register(r'Form/Form_Response_To_User', Form_Response_To_User_viewset, basename="Form_Response_To_User")
router.register(r'Form/Questions_viewset', Questions_viewset, basename="Questions")
router.register(r'Form/Response_to_form', Response_to_form_viewset, basename="Response_to_form")
router.register(r'Form/Stats', Stats_viewset, basename="Stats ")

urlpatterns = router.urls

