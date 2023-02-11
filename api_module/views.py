from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView


# class validateWebhook(APIView):
#
#     #
#     def get(self, request):
#         data = execute_to_dict(
#             "SELECT a, b FROM x WHERE y = %s AND z = %s"
#             ["yvalue", 73]
#         )
#         return Response({
#             'count': len(data),
#             'results': data
#         })
