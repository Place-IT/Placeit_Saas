from datetime import datetime

from django.db.models import Q


def return_year(self):
    return int(self.context.get("request").query_params.get("passing_year")) or datetime.now().year
def return_q_year_gt(request):
    return Q(posts__Visitng_record__visiting_date__month__gt=5)&Q(posts__Visitng_record__visiting_date__year=(return_year(request)-1))
def return_q_year_lt(request):
    return Q(posts__Visitng_record__visiting_date__month__lt=6)&Q(posts__Visitng_record__visiting_date__year=(return_year(request)))

