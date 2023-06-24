from django.db import models
from customers.models import Customer #, payment

# Create your models here.
class Invoice(models.Model):
    #payment
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    invoice_number = models.CharField(max_length=50)
    date = models.DateField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)



    def __str__(self):
        return str(self.invoice_number) 
        #return f'Invoice for {self.customer} ({self.date.date()})'

@property
def get_customer_email(self):
    return self.customer_email
