from django.http import HttpResponseRedirect
from django.urls import reverse


def Notauth(request):
    if request.user.is_authenticated == True :
        return HttpResponseRedirect(reverse("profile"))
    return True
