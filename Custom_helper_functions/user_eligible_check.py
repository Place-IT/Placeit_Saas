def check_eligible(request, obj, Form_View=True, User=False):
    """
    Check if the user is eligible for a form submission based on various conditions.

    Args:
        request: The request object.
        obj: The form object to check eligibility for.
        Form_View (bool): Indicates if the user is viewing the form (default: True).
        User (bool or object): The user object or False to use the request's user (default: False).

    Returns:
        A dictionary containing the eligibility status and reasons if not eligible.

    """
    if User is False:
        User = request.user

    def innerCheck():
        """
        Check if the user is already placed based on a 70 percent rule.

        Returns:
            A dictionary indicating if the user is already placed and the reasons.

        """
        a = False
        for x in User.form_responses.all():
            if ((obj.Visitng_record.MinLpa_offered + obj.Visitng_record.MaxLpa_offered) / 2) / (
                    (x.Form_id.Visitng_record.MinLpa_offered + x.Form_id.Visitng_record.MaxLpa_offered) / 2) >= 0.70:
                a = True

        if a:
            return {"final": False, "reason": ["Already placed"]}
        else:
            return {"final": True, "reason": []}

    if Form_View and not request.user.is_authenticated:
        return {"final": False, "reason": ["Unauthenticated"]}
    # print([x.Department.id for x in obj.department_related_form_set.all()],request.user.Affliated_Department.id)
    if Form_View and request.user.Affliated_Department.id not in [x.Department.id for x in obj.department_related_form_set.all()]:
        return {"final": False, "reason": ["Form not of your Department"]}

    elif obj.conditions is None:
        return innerCheck()

    elif Form_View and (
            request.user.groups.filter(name='Faculty').exists() or request.user.groups.filter(name='Head').exists()):
        return {"final": False, "reason": ["Logged in using a Faculty or Head account"]}

    else:
        c = innerCheck()
        if not c["final"]:
            return c

        c = {"final": True, "reason": []}
        if obj.conditions.conditon_1 >= (User.avg_sem or 0.00):
            c["final"] = False
            c["reason"].append(f"avg of all sem required: {obj.conditions.conditon_1} and your {User.avg_sem}")
        if obj.conditions.conditon_2 >= (User.SSC or 0.00):
            c["final"] = False
            c["reason"].append(f"10 percentage required: {obj.conditions.conditon_2} and your {User.SSC}")
        if obj.conditions.conditon_3 >= (User.HSC or 0.00):
            c["final"] = False
            c["reason"].append(f"12 percentage required: {obj.conditions.conditon_3} and your {User.HSC}")
        if obj.conditions.conditon_4 and User.LiveKT:
            c["final"] = False
            c["reason"].append(f"live kt not allowed: {obj.conditions.conditon_4} and your {User.LiveKT}")
        if obj.conditions.conditon_5 and User.DeadKT:
            c["final"] = False
            c["reason"].append(f"Dead kt not allowed: {obj.conditions.conditon_5} and your {User.DeadKT}")
        return c
