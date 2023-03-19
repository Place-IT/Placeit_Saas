def check_eligible(request, obj):

    user = request.user

    def innerCheck():
        # 70 percent rule

        a = False
        for x in user.form_responses.all():
            print((obj.Visitng_record.MinLpa_offered + obj.Visitng_record.MaxLpa_offered)/2,
                  ((x.Form_id.Visitng_record.MinLpa_offered + x.Form_id.Visitng_record.MaxLpa_offered) / 2),
                  (obj.Visitng_record.MinLpa_offered + obj.Visitng_record.MaxLpa_offered) / 2 / (
                          (x.Form_id.Visitng_record.MinLpa_offered + x.Form_id.Visitng_record.MaxLpa_offered) / 2) >= 0.70
                  )
            if ((obj.Visitng_record.MinLpa_offered + obj.Visitng_record.MaxLpa_offered) / 2) / (
                    (x.Form_id.Visitng_record.MinLpa_offered + x.Form_id.Visitng_record.MaxLpa_offered) / 2) >= 0.70:
                a = True

        if a:
            return False
        else:
            return True


    if not request.user.is_authenticated:
        # print(obj.id,"rule1")
        return False
    # print(request.user.email,user.form_responses.all())
    # check if user and form are of same department or not

    if request.user.Affliated_Department.id != obj.department_related_form_set.all()[0].Department.id:
        # print(obj.id,"rule2")
        return False

    # if authenticated but condition not present for form then return the output value of above function
    elif obj.conditions == None:
        # print(obj.id,"rule3")
        return innerCheck()

    # check if the user is not faculty or head
    elif request.user.groups.filter(name='Faculty').exists() or request.user.groups.filter(name='Head').exists():
        # print(obj.id,"rule4")
        return False

    # check if the user is not faculty or head
    else:
        if not innerCheck():
            # print(obj.id,"rule5")
            return False
        # print(obj.id,"rule6")
        return obj.conditions.conditon_1 >= (user.avg_sem or 0.00) and obj.conditions.conditon_2 >= (user.SSC or 0.00) \
               and obj.conditions.conditon_3 >= (user.HSC or 0.00) and \
               not (obj.conditions.conditon_4 and user.LiveKT) and not (obj.conditions.conditon_5 and user.DeadKT)