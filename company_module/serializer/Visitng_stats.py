from rest_framework import serializers

from company_module.models import Visiting_company_record

# not recomended way but no time left
def get_value(id,obj):
    j=0
    x=obj.form_set.filter(department_related_form__Department__id=id)
    for y in x:
        j=j+y.response_to_user_set.count()
    return j
a={}
try:
    from department_module.models import Department
    for x in ["Department Of Information Technology","Department Of Chemical Engineering",
              "Department Of Computer Science","Department Of Electronics and Telecomnications",
              "Department Of Instrumental","Department Of Mechinical engineering","Head"]:

        try:
            z,q=Department.objects.get_or_create(name=x)
        except Department.DoesNotExist:
            z=Department.objects.create(name=x).save()
        # print(z)
        a[z.name]=z.id
    departments_key=a

except Exception as e:
    print(e)


class Visiting_company_Stats_record_Serailizer(serializers.ModelSerializer):
    V_id=serializers.IntegerField(source="id",read_only=True)
    Date=serializers.DateField(source="visiting_date",read_only=True)
    Company_id=serializers.IntegerField(source="company.id",read_only=True)
    Company=serializers.SlugField(source="company.Company_name",read_only=True)
    Chem=serializers.SerializerMethodField()
    Comp=serializers.SerializerMethodField()
    Extc=serializers.SerializerMethodField()
    IT=serializers.SerializerMethodField()
    Instru=serializers.SerializerMethodField()
    Mech=serializers.SerializerMethodField()

    def get_Chem(self,obj):
        return get_value(a["Department Of Chemical Engineering"],obj)
    def get_Comp(self,obj):
        return get_value(a["Department Of Computer Science"],obj)
    def get_Extc(self,obj):
        return get_value(a["Department Of Electronics and Telecomnications"],obj)
    def get_IT(self,obj):
        return get_value(a["Department Of Information Technology"],obj)
    def get_Instru(self,obj):
        return get_value(a["Department Of Instrumental"],obj)
    def get_Mech(self,obj):
        return get_value(a["Department Of Mechinical engineering"],obj)

    class Meta:
        model = Visiting_company_record
        fields = [
            "V_id",
            "Company",
            "Company_id",
            "Date",
            "Chem",
            "Comp",
            "Extc",
            "IT",
            "Instru",
            "Mech"
        ]
