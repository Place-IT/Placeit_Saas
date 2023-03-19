from django.contrib.auth.decorators import login_required
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from form_module.Views import OfferLetterUploadView
from user_module.urls import router as UserRouter
from department_module.urls import router as DepartmentRouter
from company_module.urls import router as CompanyRouter
from form_module.urls import router as FormRouter
from user_module.views import UserImageUploadView, UserResume_profileUploadView

router = DefaultRouter()
router.registry.extend(DepartmentRouter.registry)
router.registry.extend(CompanyRouter.registry)
router.registry.extend(FormRouter.registry)
router.registry.extend(UserRouter.registry)

urlpatterns =[
    path('api-auth/', include('rest_framework.urls')),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('Offer_letter_update/<int:pk>/', login_required(OfferLetterUploadView.as_view()), name='Response_To_User-update'),
    path('UserImageUploadView/<int:pk>/', login_required(UserImageUploadView.as_view()), name='UserImageUploadView-update'),
    path('UserResume_profileUploadView/<int:pk>/', login_required(UserResume_profileUploadView.as_view()), name='UserResume_profileUploadView-update'),
]
urlpatterns += router.urls

