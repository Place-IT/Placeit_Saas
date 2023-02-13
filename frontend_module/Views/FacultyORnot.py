from django.http import HttpResponseRedirect
from django.urls import reverse


def FacultyOrnot(request):
    if request.user.is_authenticated == True and not request.user.groups.filter(name='Faculty').exists():
        return HttpResponseRedirect(reverse("401_page"))
    return True



