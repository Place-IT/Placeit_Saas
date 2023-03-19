from django.http import JsonResponse
from django.views.generic.edit import UpdateView

from form_module.models import Response_To_User


class OfferLetterUploadView(UpdateView):
    model = Response_To_User
    fields = ['offer_letter']

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        if self.object.User == request.user:
            return super().post(request, *args, **kwargs)
        else:
            return JsonResponse({'msg': 'User do not own the offer data'})

    def form_valid(self, form):
        self.object = form.save()
        return JsonResponse({'Success': 'Upload Sucesfully'})

    def form_invalid(self, form):
        return JsonResponse({'error': 'Upload Invalid'})
