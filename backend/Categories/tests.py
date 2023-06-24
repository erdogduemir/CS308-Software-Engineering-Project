from django.test import TestCase
from products.models import Product, Comment, Rating
from customers.models import Customer
from .models import Category
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

        return super().setUp()

    def teardown(self):
        return super().tearDown()

class RestApiTests(RestApiSetUp):
    # second variable here is a bound material
    # so they should not be equal
    def test_str_of_category_name(self):
        self.assertNotEqual(self.category.category_name, self.category.get_category_name)