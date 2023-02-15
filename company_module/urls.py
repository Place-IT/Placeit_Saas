from rest_framework import routers
from .Views import Company_viewset,Visiting_company_record_viewset

router = routers.SimpleRouter()
router.register(r'Company/Company', Company_viewset,basename="Company")
router.register(r'Company/VisitRecord', Visiting_company_record_viewset,basename='Visit_Record')


