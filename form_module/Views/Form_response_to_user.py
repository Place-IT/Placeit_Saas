from django.core.validators import RegexValidator
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.response import Response


from django_filters import rest_framework as filters
import logging

from Custom_helper_functions import CustomViewset, Gurdian_model_viewset, ModelNamePermission
from form_module.Serailizers import Form_Response_To_User_Serailizer
from form_module.models import Response_To_User,Form

logger = logging.getLogger('Form_Response_toUser')
array_validator = RegexValidator(regex="\\d+(?:,\\d+)+", message='not a valid array')
positive_number_validator = RegexValidator(regex="/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/",
                                           message='not a valid positive')


class Form_Response_To_UserFilter(filters.FilterSet):
    Visitng_record__id = filters.NumberFilter(field_name="Form_id__Visitng_record__id", lookup_expr="exact")
    company__id = filters.NumberFilter(field_name="Form_id__Visitng_record__company__id", lookup_expr="exact")

    class Meta:
        model = Response_To_User
        fields = ["Form_id"]



class Form_Response_To_User_viewset(CustomViewset,Gurdian_model_viewset):
    queryset = Response_To_User.objects.all()
    serializer_class = Form_Response_To_User_Serailizer
    permission_classes = [ModelNamePermission("response_to_user", "form_module",)]
    modelname = "response_to_user"
    filterset_class = Form_Response_To_UserFilter

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["id","User","visiting_reocrd","company","Form_id"]


    def Condition_check(self, request, queryset, *args, **kwargs):
        if request.user.is_anonymous:
            return Response({}), False
        if request.user.groups.filter(name="Head"):
            pass
        elif request.user.groups.filter(name="Faculty"):
            queryset = queryset.filter(
                Form_id__department_related_form__Department__id=request.user.Affliated_Department.id,
                # Form_id__Originator=request.user.id
            )
        elif request.user.groups.filter(name="Student"):
            queryset = queryset.filter(
                User=request.user.id)
            # print("ssssssssss",request.user.id)
        else:
            return Response({}), False


        return queryset, True




    def create(self, request, form_data=None, *args, **kwargs):

        data = request.data
        try:
            students_list = data['students_list']
            if not isinstance(students_list, list):
                return Response({'students_list': "should be an array"})

        except KeyError:
            return Response({'students_list': "answer not found in form data"})
        try:
            Form_id = data['Form_id']
            if isinstance(Form_id, int) and Form.objects.filter(id=Form_id).exists() == False:
                return Response({'Form_id': "Form_id invalid"})

        except KeyError:
            return Response({'Form_id': "answer not found in form data"})
        try:
            response_Type = data['response_Type']
            if response_Type not in ["placed", "selected"]:
                return Response({'response_Type': "should be an array"})

        except KeyError:
            return Response({'response_Type': "answer not found in form data"})

        z = []

        for x in students_list:
            z.append({
                "Form_id": data['Form_id'],
                "User": x,
                "response_Type": data['response_Type']
            })
        # print(z)
        serializer = self.get_serializer(data=z, many=True)
        # print(serializer.is_valid(),serializer.errors)

        if serializer.is_valid():
            comment = serializer.save()
        else:
            logger.error(f"{z} error invalid {serializer.errors} ")
            return Response({"Completed": False, "error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST )

        # logger.info(f"{serializer.data.id} completed sucesfully")

        headers = self.get_success_headers(serializer.data)
        return Response({"Completed": "Student Placed Successfully", "output": serializer.data}, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['delete'])
    def destroy_list(self, request, *args, **kwargs):
        data = request.data
        try:
            students_list = data['students_list']
            if not isinstance(students_list, list):
                return Response({'students_list': "should be an array"})

        except KeyError:
            return Response({'students_list': "answer not found in form data"})
        try:
            Form_id = data['Form_id']
            if Form.objects.filter(id=Form_id).exists() == False:
                return Response({'Form_id': "Form_id invalid"})

        except KeyError:
            return Response({'Form_id': "answer not found in form data"})
        try:
            response_Type = data['response_Type']
            if response_Type not in ["placed", "selected"]:
                return Response({'response_Type': "should be an array"})

        except KeyError:
            return Response({'response_Type': "answer not found in form data"})

        try:
            a = Response_To_User.objects.filter(Form_id=data["Form_id"], User__in=students_list,
                                                response_Type=response_Type)
            a.delete()
        except Response_To_User.DoesNotExist as e:
            # print(e)
            # logger.error(f" error invalid {self.serializer.errors} ")
            return Response({"error": e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # logger.info(f" deleted sucessfully {students_list} ")
        return Response({"Completed": "Student Un-Placed Successfully"}, status=status.HTTP_201_CREATED)




# def check_does_have_delete_write(request,obj):
# if request.user.is_authenticated and request.method in ['GET', 'PUT', 'PATCH','DELETE'] and obj.user == request.user:
#     return True
# elif request.user.is_authenticated and request.method in ['GET'] and request.user.groups.filter(name="Faculty"):
#     return True
# else:
#     return False
# custom_check_object=check_does_have_delete_write