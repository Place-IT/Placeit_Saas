from django_filters.rest_framework import DjangoFilterBackend
from guardian.shortcuts import assign_perm
from rest_framework import viewsets, status
from rest_framework.filters import SearchFilter
from rest_framework.response import Response

import logging

from Custom_helper_functions import CustomViewset, ModelNamePermission
from Custom_helper_functions.Permissions import Get_Allow_list_permission
from form_module.Serailizers import Response_to_form_Serailizer, Additional_Response_Serailizer
from form_module.models import ResponseFromUser

logger = logging.getLogger('Form_UserResponse')


def check_obj_permission(request, obj):
    if request.user.is_authenticated and request.method in ['GET', 'PUT', 'PATCH',
                                                            'DELETE'] and obj.user == request.user:
        return True
    elif request.user.is_authenticated and request.method in ['GET'] and request.user.groups.filter(name="Faculty"):
        return True
    else:
        return False


class Response_to_form_viewset(CustomViewset, viewsets.ModelViewSet):
    queryset = ResponseFromUser.objects.all().order_by("id")
    serializer_class = Response_to_form_Serailizer
    permission_classes = [
        ModelNamePermission("responsefromuser", "form_module", Get_Allow_list_permission, check_obj_permission), ]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["id", "user", "Form_id", "major_Response"]
    list_of_permission=["change_", 'delete_']

    def Condition_check(self, request, queryset, *args, **kwargs):
        # return Response if condition Failes else return true at end

        # print(request.user.groups.filter(name="Student"), request.user.groups.filter(name="Faculty"))
        if request.user.is_anonymous:
            return Response({}), False
        if request.user.groups.filter(name="Faculty") or request.user.groups.filter(name="Head"):
            queryset = queryset.filter(
                Form_id__department_related_form__Department__id=request.user.Affliated_Department.id,
                Form_id__Originator=request.user.id)
        elif request.user.groups.filter(name="Student"):
            queryset = queryset.filter(
                Form_id__department_related_form__Department__id=request.user.Affliated_Department.id,
                user=request.user.id)
        else:
            return Response({}), False

        return queryset, True

