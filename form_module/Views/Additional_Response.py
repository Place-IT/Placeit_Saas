from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.response import Response

from Custom_helper_functions import CustomViewset, ModelNamePermission
from Custom_helper_functions.Permissions import Get_Allow_list_permission

from form_module.Serailizers import Additional_Response_Serailizer
from form_module.models import Additional_Response


class Additional_Response_viewset(CustomViewset,viewsets.ModelViewSet):

    queryset = Additional_Response.objects.all()
    serializer_class = Additional_Response_Serailizer
    permission_classes = [ModelNamePermission("additional_response", "form_module",Get_Allow_list_permission),]
    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_fields =["id","user","form","Question","form_response"]

    def Condition_check(self, request, queryset, *args, **kwargs):
        # return Response if condition Failes else return true at end
        if request.user.is_anonymous:
            return Response({}), False
        if request.user.groups.filter(name="Faculty"):
            queryset = queryset.filter(
                form__department_related_form__Department__id=request.user.Affliated_Department.id,
                form__Originator=request.user.id)
        elif request.user.groups.filter(name="Student"):
            queryset = queryset.filter(
                form__department_related_form__Department__id=request.user.Affliated_Department.id,
                user=request.user.id)
        else:
            return Response({}), False

        return queryset, True