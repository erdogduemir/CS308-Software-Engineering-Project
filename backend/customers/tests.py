from django.test import TestCase
from .models import Customer

from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
import json

'''
ALL TEST FUNCTIONS HAS TO START WITH THE WORD "test"
'''

class RestApiSetUp(APITestCase):

    def setUp(self):
        self.customer = Customer.objects.create(
            name = "Ali", surname = "Su", tax_id = "ABCDEFGH", 
            email = "alisu@alisu.com", home_address = "Istanbul",
            password = "password", is_active = True,
            is_admin = False, is_staff = False, is_superuser = False
        )
        self.customers_url = reverse('customers')
        self.customer_data = {
            'name': "John",
            'surname': "Doe",
            'tax_id': "XYZXYZ", 
            'email': "john@doe.com",
            'home_address': "NYC",
            'password': "johndoe123123",
            'is_active': True,
            'is_admin': False,
            'is_staff': False,
            'is_superuser': False
        }
        self.change_password_data = {
            'name': "Ali",
            'surname': "Su",
            'tax_id': "ABCDEFGH", 
            'email': "alisu@alisu.com",
            'home_address': "Istanbul",
            'password': "alisu123123",
            'is_active': True,
            'is_admin': False,
            'is_staff': False,
            'is_superuser': False
        }

        return super().setUp()

    def teardown(self):
        return super().tearDown()

class RestApiTests(RestApiSetUp):

    ''' BELOW ARE UNIT TESTS FOR MODELS'''
    # customer above is not admin
    # test if it is correctly assigned
    def test_is_customer_admin(self):
        self.assertEqual(self.customer.is_admin, False)
    
    # full name function returns both name and surname
    # test if it contains the name of the customer
    def test_name_inside_full_name(self):
        self.assertIn(self.customer.get_short_name, self.customer.get_full_name[:3])

    ''' REST ARE UNIT TESTS FOR REST API REQUESTS'''
    # test the products view
    # get request returns 200 if successful
    def test_customers_page(self):
        response = self.client.get(self.customers_url, follow=True)
        self.assertEqual(response.status_code, 200)