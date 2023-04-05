from django.apps import AppConfig


class UserModuleConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_module'

    def ready(self):
        try:
            from django.contrib.auth.models import Group, Permission
            from django.contrib.contenttypes.models import ContentType
            from guardian.shortcuts import assign_perm

            stu, created_stu=Group.objects.get_or_create(name='Student')
            group, created=Group.objects.get_or_create(name='Faculty')
            permissions_list = Permission.objects.exclude(
                content_type_id__in=[
                    ContentType.objects.get(model='user').id,
                    ContentType.objects.get(model='company').id,
                    ContentType.objects.get(model='visiting_company_record').id
                                    ])
            group.permissions.set(permissions_list)

            assign_perm(f"user_module.view_user", group)
            assign_perm(f"user_module.change_user", group)
            assign_perm(f"user_module.add_user", group)
            assign_perm(f"user_module.view_user", stu)
            assign_perm(f"user_module.change_user", stu)

            assign_perm(f"form_module.view_form", stu)
            assign_perm(f"form_module.add_responsefromuser", stu)
            assign_perm(f"form_module.view_responsefromuser", stu)
            assign_perm(f"form_module.view_response_to_user", stu)
            assign_perm(f"form_module.view_questions", stu)

            Head, created_Head=Group.objects.get_or_create(name='Head')
            Head.permissions.set(Permission.objects.all())

        except Exception as e:
            print(e)