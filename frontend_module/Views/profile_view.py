from django.http import HttpResponseRedirect
from django.urls import reverse

from frontend_module.Views import BaseReactView
from user_module.models import User


def Profile_exist_check(self,request):
    try:
        User.objects.get(id=self.kwargs["pk"])
        return True
    except User.DoesNotExist:
        return HttpResponseRedirect(reverse("404_page"))


class ProfileView(BaseReactView):

    def condition_Check(self, request, context):
        a=Profile_exist_check(self,request)
        if a == True:
            context["display_user_content"]=User.objects.get(id=self.kwargs["pk"])
            # print(User.objects.get(id=self.kwargs["pk"]).form_responses,User.objects.get(id=self.kwargs["pk"]).Resume_profile == "","ddddddddddddd")
            return self.render_to_response(context)
        else :
            return a
