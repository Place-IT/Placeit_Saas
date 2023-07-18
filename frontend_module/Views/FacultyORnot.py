from django.http import HttpResponseRedirect
from django.urls import reverse


def FacultyOrnot(request):
    """
    Check if the user is a faculty or head.

    Args:
        request: The request object.

    Returns:
        True if the user is a faculty or head, otherwise redirects to the "401_page".

    """
    if request.user.is_authenticated and not (request.user.groups.filter(name='Faculty').exists() or request.user.groups.filter(name='Head').exists()):
        return HttpResponseRedirect(reverse("401_page"))
    return True


def FacultyOnly(request):
    """
    Check if the user is a faculty.

    Args:
        request: The request object.

    Returns:
        True if the user is a faculty, otherwise redirects to the "401_page".

    """
    if request.user.is_authenticated and not request.user.groups.filter(name='Faculty').exists():
        return HttpResponseRedirect(reverse("401_page"))
    return True


def HeadOnly(request):
    """
    Check if the user is a head.

    Args:
        request: The request object.

    Returns:
        True if the user is a head, otherwise redirects to the "401_page".

    """
    if request.user.is_authenticated and not request.user.groups.filter(name='Head').exists():
        return HttpResponseRedirect(reverse("401_page"))
    return True
