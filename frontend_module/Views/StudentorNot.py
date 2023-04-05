from django.http import HttpResponseRedirect
from django.urls import reverse


def StudentorNot(request):
    if request.user.is_authenticated == True and not request.user.groups.filter(name='Student').exists():
        return HttpResponseRedirect(reverse("401_page"))
    return True
