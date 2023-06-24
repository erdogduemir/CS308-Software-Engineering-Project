from django.db import models
from customers.models import Customer
from datetime import datetime

# Create your models here.

class Payment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, default='pending')
    date = models.DateTimeField(default=datetime.now())
    # Other fields for the payment, such as payment method, transaction ID, etc.

    def __str__(self):
        return f'{self.customer} - {self.amount}'
