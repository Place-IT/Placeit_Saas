def check_eligible(request,obj,Form_View=True,User=False):


    if User == False:
        User= request.user

    def innerCheck():
        # 70 percent rule

        a = False
        for x in User.form_responses.all():
            if ((obj.Visitng_record.MinLpa_offered + obj.Visitng_record.MaxLpa_offered) / 2) / (
                    (x.Form_id.Visitng_record.MinLpa_offered + x.Form_id.Visitng_record.MaxLpa_offered) / 2) >= 0.70:
                a = True

        if a:
            return {"final":False,"reason":["Already place"]}
            # return False
        else:
            return {"final":True,"reason":[]}
            # return True


    if Form_View and not request.user.is_authenticated:
        # print(obj.id,"rule1")
        return {"final":False,"reason":["Un authenticated"]}
    # print(request.user.email,user.form_responses.all())
    # check if user and form are of same department or not

    if Form_View and request.user.Affliated_Department.id != obj.department_related_form_set.all()[0].Department.id:
        # print(obj.id,"rule2")
        return {"final":False,"reason":["Form not of your Department"]}
        # return False

    # if authenticated but condition not present for form then return the output value of above function
    elif obj.conditions == None:
        # print(obj.id,"rule3")
        return innerCheck()

    # check if the user is not faculty or head
    elif Form_View and request.user.groups.filter(name='Faculty').exists() or request.user.groups.filter(name='Head').exists():
        # print(obj.id,"rule4")
        return {"final":False,"reason":["Logged in using a Faculty or Head account"]}
        # return False

    # check if the user is not faculty or head
    else:
        c=innerCheck()
        # print(c["final"])
        if not c["final"]:
            # print(obj.id,"rule5")
            return c

        # print(obj.id,"rule6")
        c={"final":True,"reason":[]}
        if  obj.conditions.conditon_1 >= (User.avg_sem or 0.00):
            c["final"]=False
            c["reason"].append(f"avg of all sem required : {obj.conditions.conditon_1} and your {User.avg_sem} ")
        if  obj.conditions.conditon_2 >= (User.SSC or 0.00):
            c["final"]=False
            c["reason"].append(f"10 percentage required : {obj.conditions.conditon_2} and your {User.SSC} ")
        if  obj.conditions.conditon_3 >= (User.HSC or 0.00):
            c["final"]=False
            c["reason"].append(f"12 percentage required:{obj.conditions.conditon_3} and your {User.HSC} ")
        if  obj.conditions.conditon_4 and User.LiveKT:
            c["final"]=False
            c["reason"].append(f"live kt not allowed : {obj.conditions.conditon_4} and your {User.LiveKT} ")
        if  obj.conditions.conditon_5 and User.DeadKT:
            c["final"]=False
            c["reason"].append(f"Dead kt not allowed : {obj.conditions.conditon_5} and your {User.DeadKT} ")
        return c
