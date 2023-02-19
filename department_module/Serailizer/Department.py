from rest_framework import serializers

from department_module.models import Department


class Department_Serailizer(serializers.ModelSerializer):
    no_of_students=serializers.IntegerField(read_only=True)
    no_of_students_placed=serializers.IntegerField(read_only=True)
    no_of_company_visited=serializers.IntegerField(read_only=True)
    Average_Package=serializers.DecimalField(max_digits=4, decimal_places=2,read_only=True)
    Range_max=serializers.DecimalField(max_digits=4, decimal_places=2,read_only=True)
    Range_min=serializers.DecimalField(max_digits=4, decimal_places=2,read_only=True)
    Total_no_of_HIgher_Studies_students=serializers.IntegerField(read_only=True)
    Total_no_of_Gate_Studies_students=serializers.IntegerField(read_only=True)
    Total_no_of_Entrepreneurship_students=serializers.IntegerField(read_only=True)


    class Meta:
        model = Department
        fields = ['id',
                  'name',
                  'no_of_students_placed',
                  'no_of_company_visited',
                  'Average_Package',
                  'Range_max',
                  'Range_min',
                  'Total_no_of_HIgher_Studies_students',
                  'Total_no_of_Gate_Studies_students',
                  'Total_no_of_Entrepreneurship_students',
                  "no_of_students"
                  ]