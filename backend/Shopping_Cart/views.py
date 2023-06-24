from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import HttpResponse
from .models import ShoppingCart, ShoppingCartItem
from .serializers import ShoppingCartSerializer, ShoppingCartItemSerializer
from django.db import transaction
from rest_framework.views import APIView
from django.http import Http404

""" SHOPPING CART """
class ShoppingCartList(APIView):
    def get(self, request, format=None):
        carts = ShoppingCart.objects.all()
        serializer = ShoppingCartSerializer(carts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ShoppingCartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ShoppingCartDetail(APIView):
    def get_object(self, pk):
        try:
            return ShoppingCart.objects.get(pk=pk)
        except ShoppingCart.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        cart = self.get_object(pk)
        serializer = ShoppingCartSerializer(cart)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        cart = self.get_object(pk)
        serializer = ShoppingCartSerializer(cart, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        cart = self.get_object(pk)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)