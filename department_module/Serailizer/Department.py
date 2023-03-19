from datetime import datetime
from rest_framework import serializers
from department_module.models import Department
from django.db.models import Max, Min, Avg, Q


def RR(self):
    return self.context.get("request")


def return_year(self):
    try:
        return int(self.context.get("request").query_params.get("passing_year")) or datetime.now().year
    except:
        return datetime.now().year


def return_q_year_gt(self):
    return Q(posts__Visitng_record__visiting_date__month__gt=5) & Q(
        posts__Visitng_record__visiting_date__year=(return_year(self) - 1))


def return_q_year_lt(self):
    return Q(posts__Visitng_record__visiting_date__month__lt=6) & Q(
        posts__Visitng_record__visiting_date__year=(return_year(self)))


class Department_Serailizer(serializers.ModelSerializer):
    no_of_students = serializers.SerializerMethodField()
    no_of_students_placed = serializers.SerializerMethodField()
    no_of_company_visited = serializers.SerializerMethodField()
    Average_Package = serializers.SerializerMethodField()
    Range_max = serializers.SerializerMethodField()
    Range_min = serializers.SerializerMethodField()
    Total_no_of_HIgher_Studies_students = serializers.SerializerMethodField()
    Total_no_of_Gate_Studies_students = serializers.SerializerMethodField()
    Total_no_of_Entrepreneurship_students = serializers.SerializerMethodField()

    def get_no_of_students(self, obj):
        return obj.user_set.filter(groups__name="Student", collage_passingYear=return_year(self)).count()

    def get_no_of_students_placed(self, obj):
        return obj.user_set.filter(form_responses__gt=0, groups__name="Student",
                                   collage_passingYear=return_year(self)).values("form_responses").count()

    def get_no_of_company_visited(self, obj):
        return obj.department_related_form_set.filter(return_q_year_gt(self) | return_q_year_lt(self)). \
            values("posts__Visitng_record").distinct().count()

    def get_Average_Package(self, obj):
        return obj.department_related_form_set.filter(return_q_year_gt(self) | return_q_year_lt(self)). \
                   values("posts__Visitng_record__MaxLpa_offered").aggregate(
            Avg('posts__Visitng_record__MaxLpa_offered')). \
                   get("posts__Visitng_record__MaxLpa_offered__avg", 0.00) or 0.00

    def get_Range_max(self, obj):
        return obj.department_related_form_set.filter(return_q_year_gt(self) | return_q_year_lt(self)). \
                   values("posts__Visitng_record__MaxLpa_offered").aggregate(
            Max('posts__Visitng_record__MaxLpa_offered')).get("posts__Visitng_record__MaxLpa_offered__max",
                                                              0.00) or 0.00

    def get_Range_min(self, obj):
        return obj.department_related_form_set.filter(return_q_year_gt(self) | return_q_year_lt(self)). \
                   values("posts__Visitng_record__MinLpa_offered").aggregate(
            Min('posts__Visitng_record__MinLpa_offered')).get("posts__Visitng_record__MinLpa_offered__min",
                                                              0.00) or 0.00

    def get_Total_no_of_HIgher_Studies_students(self, obj):
        return obj.user_set.filter(future_options="Hs", groups__name="Student",
                                   collage_passingYear=return_year(self)).count()

    def get_Total_no_of_Entrepreneurship_students(self, obj):
        return obj.user_set.filter(future_options="entru", groups__name="Student",
                                   collage_passingYear=return_year(self)).count()

    def get_Total_no_of_Gate_Studies_students(self, obj):
        return obj.user_set.filter(groups__name="Student", Gate_Status=True,
                                   collage_passingYear=return_year(self)).count()

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
