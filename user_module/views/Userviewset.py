import logging
from rest_framework import  mixins
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from django.contrib import auth
from rest_framework.viewsets import GenericViewSet

from Custom_helper_functions import CustomViewset, ModelNamePermission
from Custom_helper_functions.Permissions import obj_owner_edit_permission_or_admin_get
from ..models import User
from ..serializer import Userserializer
from django.db.models import Q

logger = logging.getLogger('UserAuth')


class UserViewset(CustomViewset,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet,
                  ):
    permission_classes = [ModelNamePermission("user", "user_module",
                                              custom_check_object=obj_owner_edit_permission_or_admin_get
                                              )]

    queryset = User.objects.all()
    serializer_class = Userserializer
    filter_backends = [SearchFilter, OrderingFilter]
    filter_fields = ['id', 'First_name', 'email']
    search_fields = ['=email', '=First_name', '=Last_name', '=phone_number']
    ordering_fields = ['email', 'id']

    @action(detail=False, methods=['get'])
    def BasicInfoOfAuthenticatedUser(self, request, pk=None):
        user = self.request.user
        # print(user.id)
        serializer = self.get_serializer(user)
        logger.info(f'{user.email}  reqested and served BasicInfoOfAuthenticatedUser')

        return Response({"success": True, "data": serializer.data})

    @action(detail=False, methods=['get'])
    def Check_Auth(self, request, pk=None):
        user = self.request.user
        # print(user, self.request.auth)

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                logger.info(f'{user.email}  isAuthenticated')
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})

    @action(detail=False, methods=['get'])
    def Logout(self, request, pk=None):
        if self.request.user.is_authenticated == False:
            return Response({'error': 'User not logged in'})
        try:
            logger.info(f'{request.user.email} Log outSucesfully')
            auth.logout(request)
            return Response({'success': 'Loggout Out'})
        except:

            return Response({'error': 'Something went wrong when logging out'})

    def filter_returner(self, queryset, request):

        if request.user.groups.filter(name='Faculty').exists() == False:
            return queryset.filter(id=request.user.id).order_by('id')
        elif request.user.groups.filter(name='Faculty').exists() and request.user.Affliated_Department is not None:
            return queryset.filter(~Q(id=request.user.id),Affliated_Department=request.user.Affliated_Department).order_by('id')
        return queryset.all()

