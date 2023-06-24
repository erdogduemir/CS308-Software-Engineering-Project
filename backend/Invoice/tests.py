from django.test import TestCase
from products.models import Product, Comment, Rating
from customers.models import Customer
from Categories.models import Category
from .models import Invoice
from datetime import datetime

from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
import json

'''
ALL TEST FUNCTIONS HAS TO START WITH THE WORD "test"
'''

class RestApiSetUp(APITestCase):

    def setUp(self):
        self.category = Category.objects.create(
            category_id = 1, category_name = "Sedan"
        )
        self.product = Product.objects.create(
            pid = 1, pname = "Honda", pmodel = "Civic", pnumber = 5,
            pdescription = "Family car", pstock = 5, pprice = 10000,
            pwarranty = "2 years of warranty", pdistinfo = "SU",
            pcategory = self.category, ppopularity = 0
        )
        self.customer = Customer.objects.create(
            name = "Ali", surname = "Su", tax_id = "ABCDEFGH", 
            email = "alisu@alisu.com", home_address = "Istanbul",
            password = "password", is_active = True,
            is_admin = False, is_staff = False, is_superuser = False
        )
        self.comment = Comment.objects.create(
            cproduct = self.product, ccustomer = self.customer,
            ctext = "Favorite car!", ccreated_date = datetime.now(),
            c_is_approved = False
        )
        self.rating = Rating.objects.create(
            rproduct = self.product, rcustomer = self.customer,
            rstars = 4, rcreated_date = datetime.now()
        )
        self.invoice = Invoice.objects.create(
            customer = self.customer,
            invoice_number = 1234,
            date = datetime.now(),
            total_amount = 200
        )

        return super().setUp()

    def teardown(self):
        return super().tearDown()

class RestApiTests(RestApiSetUp):

    ''' BELOW ARE UNIT TESTS FOR MODELS'''
    # stock is defined as 5 above
    # test if it is actually 5
    def test_stock_of_item(self):
        self.assertEqual(self.invoice.invoice_number , 1234)

    # invoice model created a bit before these tests
    # therefore datetime values should at least be same but mostly less
    def test_is_date_recent(self):
        self.assertLessEqual(self.invoice.date, datetime.now())
    
    def test_customer_foreign_key(self):
        self.assertEqual(self.invoice.customer.pk, self.customer.pk)