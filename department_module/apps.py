from django.apps import AppConfig

class DepartmentModuleConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'department_module'

    def ready(self):
        try:
            from department_module.models import Department
            for x in ["Department Of Information Technology","Department Of Chemical Engineering",
                      "Department Of Computer Science","Department Of Electronics and Telecomnications",
                                                       "Department Of Instrumental","Department Of Mechinical engineering","Head"]:
                try:
                     Department.objects.get_or_create(name=x)
                except Department.DoesNotExist:
                     Department.objects.create(name=x).save()
        except Exception as e:
            print(e)