from rest_framework.routers import DefaultRouter
from .views import UserViewset ,UserCoreOperationsViewset



router = DefaultRouter()
router.register(r'auth/User', UserViewset)
router.register(r'auth/CUser', UserCoreOperationsViewset, basename='user1')

