from django.db import models
from customers.models import Customer
from products.models import Product

# Create your models here.

class ShoppingCart(models.Model):
    scustomer = models.OneToOneField(Customer, null=True, on_delete=models.CASCADE)
    screated_date = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return "Cart owned by " + self.scustomer.name

class ShoppingCartItem(models.Model):
    sproduct = models.ForeignKey(Product, on_delete=models.CASCADE)
    squantity = models.IntegerField('Quantity', default=1)
    sprice = models.FloatField(blank=True)
    scart = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.sproduct) + "inside the cart owned by " + str(self.scart.scustomer.get_full_name)
