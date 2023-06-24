from django.db import models
from Categories.models import Category
from customers.models import Customer

class Product(models.Model):

    CATEGORY_CHOICES = (
        ('sedan', 'Sedan'),
        ('hatchback', 'Hatchback'),
        ('suv', 'SUV'),
    ) 

    pid = models.IntegerField()
    pname = models.CharField("Product Name", max_length=240)
    pmodel = models.CharField("Product Model", max_length=240)
    pimage = models.CharField("Product Image", max_length=240, blank=True)
    pnumber = models.IntegerField("Doors")
    pdescription = models.CharField("Product Description", max_length=240)
    prating = models.FloatField("Avg. Rating", default=0.0)
    pstock = models.IntegerField("Stock")
    pprice = models.IntegerField("Price")
    pwarranty = models.CharField("Product Warranty", max_length=240)
    pdistinfo = models.CharField("Product Distributor", max_length=240)
    pcategory = models.ForeignKey(Category, on_delete=models.CASCADE)
    ppopularity = models.IntegerField(default=0)
    psales_discount = models.FloatField("Sales Discount", default=0.0)

    def __str__(self):
        return str(self.pid) + "-" + self.pname

    def increment_popularity(self):
        self.ppopularity += 1
        self.save()
        
    def apply_sales_discount(self, discount):
        self.pprice -= self.pprice * (discount / 100)
        self.psales_discount = discount
        self.save()

# Create your models here.
class Comment(models.Model):
    cproduct = models.ForeignKey(Product, on_delete=models.CASCADE)
    ccustomer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    ctext = models.TextField()
    ccreated_date = models.DateTimeField(auto_now_add=True)
    c_is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.ctext + " --- By: " + self.ccustomer.name

class Rating(models.Model):
    rproduct = models.ForeignKey(Product, on_delete=models.CASCADE)
    rcustomer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rstars = models.FloatField()
    rcreated_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rstars) + " --- for: " + self.rproduct.pname + " --- By: " + self.rcustomer.email
