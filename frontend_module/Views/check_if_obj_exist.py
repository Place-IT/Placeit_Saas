from django.http import HttpResponseRedirect
from django.urls import reverse

from form_module.models import Form
from frontend_module.Views import BaseReactView
from user_module.models import User


class Obj_existence_check_View(BaseReactView):
    model = None
    key = None
    context_variable = None

    def Check(self, request):
        try:
            self.model.objects.get(id=self.kwargs["pk"])
            return True
        except self.model.DoesNotExist:
            return HttpResponseRedirect(reverse("404_page"))

    def condition_Check(self, request, context):
        b=super().condition_Check(request,context)
        if b == False:
            return self.render_to_response(context)
        elif b != True:
            return b
        elif b:
            a = self.Check(request)
            if a == True:
                context[self.context_variable] = self.model.objects.get(id=self.kwargs[self.key])
                return self.render_to_response(context)
            else:
                return a
