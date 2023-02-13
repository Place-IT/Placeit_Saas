from django.http import HttpResponseRedirect
from django.urls import reverse


def Affliated_to_department_or_not(request):

    if request.path != reverse("ProfileUpdate"):
        if request.user.is_authenticated == True \
                and (request.user.Affliated_Department is None \
                or request.user.First_name is None\
                ):
            return HttpResponseRedirect(reverse("ProfileUpdate")+'?'+"next="+ request.path)
    return True
