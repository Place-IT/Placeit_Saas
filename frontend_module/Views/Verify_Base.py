from django.http import HttpResponseRedirect
from django.urls import reverse

from frontend_module.Views import BaseReactView
from frontend_module.Views.Affliated_to_department import Affliated_to_department_or_not


def Verifie(request):
    if (request.path == reverse("emailverifysent") or request.path == reverse("emailverifyconform")):
        return False
    else:
        if request.user.is_authenticated == True and request.user.email_verified == False:
            return HttpResponseRedirect(reverse("emailverifysent")+ '?' +"next="+ request.path)
    return True



class DefaultVerifyReactView(BaseReactView):

    def condition_Check(self, request, context):
        self.condition_check_Function.append(Verifie)
        self.condition_check_Function.append(Affliated_to_department_or_not)
        return super().condition_Check(request, context)
