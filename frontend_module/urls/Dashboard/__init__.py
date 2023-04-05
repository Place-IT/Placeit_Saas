from django.contrib.auth.decorators import login_required
from django.urls import path

from company_module.models import Company
from frontend_module.Views import DefaultVerifyReactView, Obj_existence_check_View
from frontend_module.Views.FacultyORnot import FacultyOrnot,  HeadOnly

urlpatterns=[
    path('',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="dashbaord_landing"),

    path('student_search/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="Student_Search"),
    path('student_profile/<int:pk>/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="Student_Profile"),

    path('company_search/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="Company_Search"),
    path('company_profile/<int:pk>/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="Company_profile"),
    path('company_create/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[HeadOnly])),name="Company_create"),
    path('company_profile/<int:pk>/visitng_record/<int:vr>/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="visitng_record"),
    path('company_visiting_create/<int:pk>/',login_required(Obj_existence_check_View.as_view(
                                                                                            condition_check_Function=[HeadOnly],
                                                                                            model = Company,
                                                                                            key = "pk",
                                                                                            context_variable = "company_detail")),
                                                                                            name="Company_create"),

    path('companyVisitStats/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="Company_visit_stats"),

    path('post_list/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="Post_list"),
    path('post_Create/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="Post_Create"),
    path('post_detail/<int:pk>/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="Post_Detail"),

    path('college/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="college_dashboard"),
    path('department/',login_required(DefaultVerifyReactView.as_view(condition_check_Function=[FacultyOrnot])),name="department_dashboard"),
]
