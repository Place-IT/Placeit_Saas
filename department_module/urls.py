from rest_framework import routers
from .Views import  Department_viewset
# ,Specific_User_Form_viewset,Department_related_form_viewset

router = routers.SimpleRouter()

router.register(r'Department/DepartmentProfile', Department_viewset,basename="Department Profile")
# router.register(r'Department/Specific_User_Form', Specific_User_Form_viewset,basename='Specific_User_Form')
# router.register(r'Department/Department_related_form_viewset', Department_related_form_viewset,basename='Department form')

