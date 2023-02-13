from django.views.generic import TemplateView


class BaseReactView(TemplateView):
    template_name = "React_index.html"

    # functions which will check req and return true or false
    condition_check_Function = []

    def condition_Check(self, request, context):
        for x in self.condition_check_Function:
            a = x(request)

            # a == False
            if a == False:
                return self.render_to_response(context)
            # a is not true and not False but a response
            elif a != True:
                return a
            # just for understanding if true pass
            elif a:
                pass
        else:
            return True

    def get(self, request, context=None, *args, **kwargs):
        if context is None:
            context = self.get_context_data(**kwargs)

            a = self.condition_Check(request, context)

            if a == False:
                return self.render_to_response(context)
            elif a != True:
                return a
        return self.render_to_response(context)
