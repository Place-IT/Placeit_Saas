from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from Company.urls import router as CompanyRouter
# from Department.urls import router as DepartmentRouter
# from Form.urls import router as FormRouter
from user_module.urls import router as UserRouter

router = DefaultRouter()
# router.registry.extend(DepartmentRouter.registry)
# router.registry.extend(CompanyRouter.registry)
# router.registry.extend(FormRouter.registry)
router.registry.extend(UserRouter.registry)



urlpatterns =[
    path('api-auth/', include('rest_framework.urls')),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]
urlpatterns += router.urls
