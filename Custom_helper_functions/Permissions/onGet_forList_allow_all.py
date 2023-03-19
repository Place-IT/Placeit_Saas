def Get_Allow_list_permission(request,obj=None):
    if request.user.is_authenticated:
        if request.method in ['GET']:
            return True
def Get_Allow_list_permission_GET(request,obj=None):
    if request.method in ['GET']:
        return True
