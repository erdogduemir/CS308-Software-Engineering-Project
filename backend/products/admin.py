from django.contrib import admin
from .models import Product, Comment, Rating

admin.site.register(Product)
admin.site.register(Comment)
admin.site.register(Rating)
