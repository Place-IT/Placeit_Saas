from django.http import HttpResponseRedirect
from django.urls import reverse

from frontend_module.Views import BaseReactView



def Verifie(request):
    if (request.path == reverse("emailverifysent") or request.path == reverse("emailverifyconform")):
        return False
    else:
        if request.user.is_authenticated == True and request.user.email_verified == False:
            return HttpResponseRedirect(reverse("emailverifysent")+ '?' +"next="+ request.path)
    return True


def Check_basic_detail_filled_or_not(request):

    # "collage_passingYear","collage_joinig_year"
    a=[]
    if request.user.groups.filter(name='Faculty').exists() or request.user.groups.filter(name='Head').exists():
        a=["Affliated_Department","email","First_name","middle_name","Last_name","Date_Of_Birth"]
    else:
        a=["Affliated_Department","email","First_name","middle_name","Last_name","Date_Of_Birth","MIS_no","Date_Of_Birth",
           "Diploma","HSC","JEE","MhCET","Parent_phone_number","Student_phone_number","collage_joinig_year","collage_passingYear"]
    if request.path != reverse("ProfileUpdate"):
        if request.user.is_authenticated == True :
            for x in a:
                if  getattr(request.user, x) is None:
                    return HttpResponseRedirect(reverse("ProfileUpdate")+'?'+"next="+ request.path)
    return True

class DefaultVerifyReactView(BaseReactView):

    def condition_Check(self, request, context):
        self.condition_check_Function.append(Verifie)
        self.condition_check_Function.append(Check_basic_detail_filled_or_not)
        return super().condition_Check(request, context)
