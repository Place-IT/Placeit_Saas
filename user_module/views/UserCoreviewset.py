from django.core.exceptions import ValidationError
from guardian.shortcuts import assign_perm
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib import auth

from Custom_helper_functions import Gurdian_model_viewset, CustomViewset, ModelNamePermission
from Custom_helper_functions.Permissions import obj_owner_edit_permission_or_admin_get
from django.contrib.auth import password_validation
from django.core.validators import validate_email
from ..helper_functions.email_verify import email_verfy_core
from ..models import User
from ..serializer import UserserializerCoreOperations, PasswordSerializer
from rest_framework.status import *
import logging



logger = logging.getLogger('UserLogger')


class UserCoreOperationsViewset(CustomViewset,Gurdian_model_viewset, viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserserializerCoreOperations

    permission_classes = [ModelNamePermission("user", "user_module",
                                              custom_check_view=lambda x:True,
                                              custom_check_object=obj_owner_edit_permission_or_admin_get
                                              ),]

    list_of_permission = ["change_", 'delete_']
    modelname = "user"

    def create(self, request, *args, **kwargs):

        data = request.data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data['email']
        password = serializer.data['password']
        re_password = serializer.data['re_password']

        re_password = password
        try:

            if password == re_password:
                # check if email exists
                if User.objects.filter(email=email).exists():
                    return Response({'error': 'email already exists'})


                else:
                    # Passowrd strength check
                    try:
                        password_validation.validate_password(password)
                    except ValidationError:
                        return Response({'error': "password_short"})

                    if len(password) < 6:
                        return Response({'error': 'Password must be at least 6 characters'})
                    else:
                        # create user
                        user = User.objects.create_user_custom(email=email, password=password)
                        logger.info(f' User Created  {user.id}')
                        auth.login(request, user, backend='django.contrib.auth.backends.ModelBackend')

                        email_verfy_core(email, request)

                        self.add_permissions(user,user)

                        # for x in self.list_of_permission:
                        #     assign_perm(f"{x}user", user, user)

                        return Response({'success': 'User created successfully'}, status=HTTP_201_CREATED)

            else:
                return Response({'error': 'Passwords do not match'})


        except Exception as e:
            logger.error(f' User Created error {e}')
            print(e)
            return Response({'error': 'Something went wrong when registering account'},
                            status=HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'])
    def email_verify(self, request, pk=None):
        data = self.request.data

        try:
            email = data['email']
        except KeyError:
            return Response({'error': "email not found in form data"})
        try:
            validate_email(email)
        except ValidationError:
            return Response({'error': "invalid-email"})

        return email_verfy_core(email,request)

    @action(detail=False, methods=['post'])
    def email_verify_conform(self, request, pk=None):
        data = self.request.data

        try:
            email_token = data['token']

        except KeyError:
            return Response({'error': "token not found in form data"})

        if email_token == "":
            return Response({'error': 'no token exist'})

        try:
            user = User.objects.get(email_token=f"{email_token}")
            if user.email_verified == True:
                return Response({'success': f'email already verified '}, status=status.HTTP_200_OK)
            user.email_verified = True
            user.save()
            auth.login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            logger.info(f'{user.email} email-verify conform')

            return Response({'success': f'email verified '}, status=status.HTTP_201_CREATED)


        except User.DoesNotExist as e:
            return Response({'token': 'no token exist'})
        except Exception as e:
            # print(e)
            logger.critical(f'email-verify Failed', e)
            return Response({'error': 'some unexpected error'})

    @action(detail=False, methods=['post'])
    def login(self, request, pk=None):
        data = self.request.data

        try:
            email = data['email']
        except KeyError:
            return Response({'error': "email not found in form data"})

        try:
            password = data['password']
        except KeyError:
            return Response({'error': "password not found in form data"})

        try:

            user = auth.authenticate(email=email, password=password)

            if user is not None:

                auth.login(request, user)

                logger.info(f'{user.email} looged in  sucesfull  SuperUserAccount={user.is_superuser}')
                return Response({'success': 'User authenticated'}, status=status.HTTP_200_OK)


            else:

                try:
                    a = User.objects.get(email=email)

                    if a.is_active == False:
                        return Response({'error': 'account not activated yet'})

                except User.DoesNotExist:
                    return Response({'error': 'email does not exist'})

                if a.check_password(password) == False:
                    logger.error(f'wrong password {a.email} auth failed')
                    return Response({'error': 'wrong password'})

                logger.error(f'Error Authenticating')
                return Response({'error': 'Error Authenticating'})

        except Exception as e:

            logger.critical(f'login Failed with ', e)
            return Response({'error': 'Something went wrong when logging in'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'])
    def change_password(self, request, pk=None):
        user = self.request.user
        if user.is_authenticated == False:
            return Response({"error": "Un-Authenticated"},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = PasswordSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'error': 'Current password incorrect'},
                                status=status.HTTP_400_BAD_REQUEST)
            try:
                pass
                # print("passes")
                password_validation.validate_password(serializer.data.get('new_password'))
            except ValidationError:
                return Response({'error': "password_short"})

            user.set_password(serializer.data.get('new_password'))
            user.save()
            auth.login(self.request, user, backend='django.contrib.auth.backends.ModelBackend')

            logger.info(f'{user.email} PasswordChange success in')

            return Response({'success': 'password set'}, status=status.HTTP_200_OK)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

    def filter_returner(self, queryset, request):
        if request.user.groups.filter(name='Head').exists() == False:
            return queryset.filter(id=request.user.id)
        return queryset
