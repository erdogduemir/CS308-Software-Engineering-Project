from rest_framework import serializers
from .models import Product, Comment, Rating

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('pk', 'cproduct', 'ccustomer', 'ctext', 'ccreated_date', 'c_is_approved')


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('pk', 'rproduct', 'rcustomer', 'rstars', 'rcreated_date')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('pk', 'pid', 'pname', 'pimage', 'pmodel', 'pnumber', 'pdescription', 'prating', 'pstock', 'pprice', 'pwarranty', 'pdistinfo', 'pcategory', 'ppopularity','psales_discount')
