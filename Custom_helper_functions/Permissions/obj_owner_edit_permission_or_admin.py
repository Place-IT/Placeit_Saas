from guardian.shortcuts import get_perms

def obj_owner_edit_permission_or_admin_get(request,obj=None):
    if request.user.is_authenticated:
        if request.user.id == obj.id:
            return True
        elif len(get_perms(request.user, obj)) > 0:
            return True
        else:
            if request.user.groups.filter(name='Faculty').exists() and request.method in ['GET']:
                return True
            return False



def obj_owner_edit_permission_or_admin_get_user_list(request,obj=None):
    if request.user.is_authenticated:
        if request.user.id == obj.id:
            return True
        elif len(get_perms(request.user, obj)) > 0:
            return True
        else:
            if request.user.groups.filter(name='Member').exists() and request.method in ['GET']:
                return True
            return False