from django.test import TestCase
from Shopping_Cart.models import ShoppingCart, ShoppingCartItem
from products.models import Product
from customers.models import Customer
from Categories.models import Category
from .models import Order
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
        self.cart = ShoppingCart.objects.create(
            scustomer = self.customer, screated_date = datetime.now
        )
        self.item = ShoppingCartItem.objects.create(
            sproduct = self.product, sprice = self.product.pprice,
            scart = self.cart
        )
        self.order_url = reverse('order')

        self.cart_data = {
            'scustomer': self.customer.pk, 'screated_date': datetime.now()
        }
        self.order = Order.objects.create(
            customer = self.customer,
            order_date = datetime.now(),
            total_product = 3,
            all_products = "1,2,1,2",
            total_cost = 300,
            status = "processing"
        )

        return super().setUp()

    def teardown(self):
        return super().tearDown()

class RestApiTests(RestApiSetUp):
    
    ''' BELOW ARE UNIT TESTS FOR MODELS'''
    # normally, isSentToDelivery is created as False as default
    # test this default function
    def test_is_sent_to_delivery(self):
        self.assertEqual(self.order.isSentToDelivery, False)


    # testing foreign key of Order model
    def test_str_of_customer_name(self):
        self.assertEqual(self.order.customer.id, self.customer.id)
    
    
    ''' REST ARE UNIT TESTS FOR REST API REQUESTS '''
    # test the order view
    # get request returns 200 if successful
    def test_order_page(self):
        response = self.client.get(self.order_url, follow=True)
        self.assertEqual(response.status_code, 200)