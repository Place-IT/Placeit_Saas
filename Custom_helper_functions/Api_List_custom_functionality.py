import logging
from rest_framework import viewsets
from rest_framework.response import Response
# logger = logging.getLogger('UserAuth')


class CustomViewset:
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        # if condtion fail then for paginator
        a=queryset
        try:
            a, b = self.Condition_check(request, queryset, *args, **kwargs)
            if not b:
                return a
        except Exception as e:
            print(e)
            # logger.error(f"some exception occured  while performing Condition_check as {e}")

        page = self.paginate_queryset(a)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(a, many=True)

        return Response(serializer.data)

    def Condition_check(self, request, queryset, *args, **kwargs):
        # return Response if condition Failes else return true at end
        if request.user.is_anonymous:
            return Response({}), False

        queryset = self.filter_returner(queryset, request)

        return queryset,True

    def filter_returner(self, queryset, request):
        return queryset.filter(id=request.user.id)
