from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('pk', 'address', 'customer', 'order_date', 'total_product', 'all_products', 'all_costs', 'total_cost', 'status', 'isSentToDelivery', 'refunded_items', 'return_requested_items')


