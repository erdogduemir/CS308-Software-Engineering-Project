from django.test import TestCase
from .models import ShoppingCart, ShoppingCartItem
from products.models import Product
from customers.models import Customer
from Categories.models import Category
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
        self.shopping_cart_url = reverse('shopping_cart')

        self.cart_data = {
            'scustomer': self.customer.pk, 'screated_date': datetime.now()
        }

        return super().setUp()

    def teardown(self):
        return super().tearDown()

class RestApiTests(RestApiSetUp):
    
    ''' BELOW ARE UNIT TESTS FOR MODELS'''
    # normally, quantity is created as 1 as default
    # test this default function
    def test_quantity_of_item(self):
        self.assertEqual(self.item.squantity, 1)

    # testing string function of shopping cart
    # e.g., Cart owned by John Doe
    def test_str_of_cart(self):
        self.assertEqual(str(self.cart), "Cart owned by " + self.customer.name)
    
    # testing string function of shopping cart item
    # e.g., <pid> - Honda Civic inside the cart owned by John Doe
    def test_str_of_cart_item(self):
        self.assertEqual(str(self.item), str(self.product)\
            + "inside the cart owned by " + str(self.cart.scustomer.get_full_name))
    
    ''' REST ARE UNIT TESTS FOR REST API REQUESTS'''
    # test the cart view
    # get request returns 200 if successful
    def test_shoppingcart_page(self):
        response = self.client.get(self.shopping_cart_url, follow=True)
        self.assertEqual(response.status_code, 200)
    
    # it should NOT post the request
    # because the corresponding cart will be created with previous test functions
    # thus, the assert must be equal to 400 (bad request)
    def test_post_shopping_cart(self):
        response = self.client.post(self.shopping_cart_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 400)
