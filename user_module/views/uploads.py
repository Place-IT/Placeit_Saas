from django.http import JsonResponse
from django.views.generic.edit import UpdateView
from user_module.models import User
import logging

logger = logging.getLogger('UserLogger')

class UserImageUploadView(UpdateView):
    model = User
    fields = ['i_card_image']

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        print(self.object.id == request.user,self.object.id , request.user)
        if self.object.id == request.user.id:
            return super().post(request, *args, **kwargs)
        else:
            return JsonResponse({'msg': 'User do not own the object data'})

    def form_valid(self, form):
        self.object = form.save()

        return JsonResponse({'Success': 'Upload Sucesfully'})

    def form_invalid(self, form):
        return JsonResponse({'error': 'Upload Invalid'})
#

class UserResume_profileUploadView(UpdateView):
    model = User
    fields = ['Resume_profile']

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        print(self.object.id == request.user,self.object.id , request.user)
        if self.object.id == request.user.id:
            return super().post(request, *args, **kwargs)
        else:
            return JsonResponse({'msg': 'User do not own the object data'})

    def form_valid(self, form):
        self.object = form.save()
        return JsonResponse({'Success': 'Upload Sucesfully'})

    def form_invalid(self, form):
        return JsonResponse({'error': 'Upload Invalid'})