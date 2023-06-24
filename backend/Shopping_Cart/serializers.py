from rest_framework import serializers
from .models import ShoppingCart, ShoppingCartItem

class ShoppingCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingCart
        fields = ('pk', 'scustomer', 'screated_date')

class ShoppingCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingCartItem
        fields = ('pk', 'sproduct', 'squantity', 'sprice', 'scart')