from django.db import models
from customers.models import Customer

class Order(models.Model):
  
    STATUS_CHOICES = (
        ('processing', 'Processing'),
        ('intransit', 'In Transit'),
        ('delivered', 'Delivered'),
    )
 
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    address = models.CharField(max_length=240, blank=True)
    order_date = models.CharField(max_length=30, blank=True)
    total_product = models.CharField(max_length=4)
    all_products = models.CharField(max_length=240, blank=True)
    all_costs = models.CharField(max_length=240, blank=True)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    isSentToDelivery = models.BooleanField(default = False)
    refunded_items = models.CharField(max_length=240, blank=True)
    return_requested_items = models.CharField(max_length=240, blank=True)

def __str__(self):
    return str(self.pk)

@property
def get_customer_name(self):
    return self.customer_name

@property
def get_customer_email(self):
    return self.customer_email

@property
def get_order_date(self):
    return str(self.order_date)

@property
def get_total_cost(self):
    return str(self.total_cost)

