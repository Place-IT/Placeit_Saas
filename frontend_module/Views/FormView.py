from django.http import HttpResponseRedirect
from django.urls import reverse

from form_module.models import Form
from frontend_module.Views import BaseReactView


def Form_exist_check(self,request):
    try:
        Form.objects.get(id=self.kwargs["pk"])
        return True
    except Form.DoesNotExist:
        return HttpResponseRedirect(reverse("404_page"))


class FormView(BaseReactView):

    def condition_Check(self, request, context):
        a=Form_exist_check(self,request)
        if a == True:
            return self.render_to_response(context)
        else :
            return a
