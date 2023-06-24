from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import HttpResponse
from .models import payments
from .serializers import PaymentSerializer
from django.db import transaction
from rest_framework.views import APIView
from django.http import Http404

class PaymentList(APIView):
    def get(self, request, format=None):
        payments = payments.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PaymentDetail(APIView):
    def get_object(self, pk):
        try:
            return payments.objects.get(pk=pk)
        except payments.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        payments = self.get_object(pk)
        serializer = PaymentSerializer(payments)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        payments = self.get_object(pk)
        serializer = PaymentSerializer(payments, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        payments = self.get_object(pk)
        payments.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)