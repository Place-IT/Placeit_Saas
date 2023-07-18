from django.shortcuts import render
from django.urls import path


def hoc(num):
    """
    Higher-order function that returns a view function to render an error page.

    Args:
        num (int): The error code number.

    Returns:
        A view function that renders the error page.

    """
    def error(request, exception=None):
        context = {}
        return render(request, f'errors/{num}_page.html', context)

    return error


urlpatterns = [
    path('400/', hoc(400), name="400_page"),
    path('401/', hoc(401), name="401_page"),
    path('403/', hoc(403), name="403_page"),
    path('404/', hoc(404), name="404_page"),
    path('500/', hoc(500), name="500_page"),
]
