from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import HttpResponse
from .models import Customer
from .serializers import UserCreateSerializer
from django.db import transaction
from rest_framework.views import APIView
from django.http import Http404

class CustomerList(APIView):
    def get(self, request, format=None):
        customers = Customer.objects.all()
        serializer = UserCreateSerializer(customers, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CustomerDetail(APIView):
    def get_object(self, pk):
        try:
            return Customer.objects.get(pk=pk)
        except Customer.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        customer = self.get_object(pk)
        serializer = UserCreateSerializer(customer)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        customer = self.get_object(pk)
        serializer = UserCreateSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        customer = self.get_object(pk)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CustomerDetailByEmail(APIView):
    def get_object(self, email):
        try:
            return Customer.objects.get(email=email)
        except Customer.DoesNotExist:
            raise Http404

    def get(self, request, email, format=None):
        customer = self.get_object(email)
        serializer = UserCreateSerializer(customer)
        return Response(serializer.data)

    def put(self, request, email, format=None):
        customer = self.get_object(email)
        serializer = UserCreateSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, email, format=None):
        customer = self.get_object(email)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)