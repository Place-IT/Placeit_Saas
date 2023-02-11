from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from . import settings
# from frontend.urls import hoc

urlpatterns = [
                  # path('', include("frontend.urls"),),
                  path('admin/', admin.site.urls),
                  path('api/', include("api_module.urls"),),
              ]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# handler403=hoc(403)
# handler404=hoc(404)
# handler400=hoc(400)
# handler500=hoc(500)