from rest_framework import permissions


def ModelNamePermission(ModelName: str, AppName: str, custom_check_view=None, custom_check_object=None, ):
    class ModelNamePermission_Class(permissions.BasePermission):

        """
        Custom permission to only allow owners of an object to edit it.
        """

        modelname = ModelName
        appname = AppName

        def has_permission(self, request, view):
            # print("111111111111111111111111111111111111111111zzzzzzzzzzzz")
            if custom_check_view is not None:
                res = custom_check_view(request)
                # print("dddd",res)
                if res:
                    return True
                elif res == False:
                    # print("false")
                    return False
            # print(f'{self.appname}.view_{self.modelname}',request.user.has_perm(f'{self.appname}.view_{self.modelname}'))
            if request.user.is_authenticated:
                if request.method in ['GET']:
                    return request.user.has_perm(f'{self.appname}.view_{self.modelname}')
                if request.method in ['POST']:
                    return request.user.has_perm(f'{self.appname}.add_{self.modelname}')
                if request.method in ['PUT', 'PATCH']:
                    return request.user.has_perm(f'{self.appname}.change_{self.modelname}')
                if request.method in ['DELETE']:
                    return request.user.has_perm(f'{self.appname}.delete_{self.modelname}')
            return False


        def has_object_permission(self, request, view, obj):
            # print("111111111111111111111111111111111111111111")
            if custom_check_object is not None:
                res = custom_check_object(request, obj)
                # print(res, "ressssss")
                if res:
                    return True
                elif res == False:
                    return False

            if request.user.is_authenticated:
                if request.method in ['GET']:
                    return request.user.has_perm(f'{self.appname}.view_{self.modelname}', obj)
                if request.method in ['POST']:
                    return request.user.has_perm(f'{self.appname}.add_{self.modelname}', obj)
                if request.method in ['PUT', 'PATCH']:
                    return request.user.has_perm(f'{self.appname}.change_{self.modelname}', obj)
                if request.method in ['DELETE']:
                    return request.user.has_perm(f'{self.appname}.delete_{self.modelname}', obj)

            return False

    return ModelNamePermission_Class
