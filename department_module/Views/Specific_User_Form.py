from rest_framework import viewsets

from department_module.Serailizer.Specific_User_Form import Specific_User_Form_Serailizer
from department_module.models import Specific_User_Form


class Specific_User_Form_viewset(viewsets.ModelViewSet):

    queryset = Specific_User_Form.objects.all()
    serializer_class = Specific_User_Form_Serailizer
