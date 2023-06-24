from django.test import TestCase
from .models import Product, Comment, Rating
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
            pcategory = self.category, ppopularity = 0, psales_discount = 0
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
        self.products_url = reverse('products')
        self.comments_url = reverse('comments')
        self.ratings_url = reverse('ratings')

        self.product_data = {
            'pid': 1,
            'pname': "Toyota",
            'pmodel': "Corolla",
            'pnumber': 5,
            'pdescription': "Family car",
            'pstock': 5,
            'pprice': 10000,
            'pwarranty': "2 years of warranty",
            'pdistinfo': "SU",
            'pcategory': self.category.category_id,
            'ppopularity': 0,
            'psales_discount':0
        }

        self.comment_data = {
            'cproduct': self.product.pk, 'ccustomer': self.customer.pk,
            'ctext': "Favorite car!", 'ccreated_date': datetime.now(),
            'c_is_approved': False
        }
        self.rating_data = {
            'rproduct': self.product.pk, 'rcustomer': self.customer.pk,
            'rstars': 4, 'rcreated_date': datetime.now()
        }

        return super().setUp()

    def teardown(self):
        return super().tearDown()

class RestApiTests(RestApiSetUp):

    ''' BELOW ARE UNIT TESTS FOR MODELS'''
    # stock is defined as 5 above
    # test if it is actually 5
    def test_stock_of_item(self):
        self.assertEqual(self.product.pstock, 5)
    
    # comment and rating are created by the same customer
    # therefore, their foreign key should be equal
    def test_foreign_keys(self):
        self.assertEqual(self.comment.ccustomer.pk, self.rating.rcustomer.pk)

    # check its string function to makes things easier on backend
    def test_str_of_comment(self):
        self.assertEqual(str(self.comment), self.comment.ctext + " --- By: " + self.comment.ccustomer.name)

    # ppopularity is default zero
    def test_default_popularity(self):
        self.assertEqual(self.product.ppopularity, 0)

    ''' REST ARE UNIT TESTS FOR REST API REQUESTS'''
    # test the products view
    # get request returns 200 if successful
    def test_products_page(self):
        response = self.client.get(self.products_url, follow=True)
        self.assertEqual(response.status_code, 200)

    # send put request to change Honda Civic to Toyota Corolla
    # should return 200 if successful
    def test_put_request_for_product(self):
        response = self.client.put(self.products_url + '1/',\
            self.product_data, format='json')
        self.assertEqual(response.status_code, 200)
    
    # test the comments view
    # get request returns 200 if successful
    def test_comments_page(self):
        response = self.client.get(self.comments_url, follow=True)
        self.assertEqual(response.status_code, 200)
    
    # send post request to add new comment
    # should return 201 if successful
    def test_post_request_for_comments(self):
        response = self.client.post(self.comments_url, self.comment_data, format='json')
        self.assertEqual(response.status_code, 201)
    
    # test the ratings view
    # get request returns 200 if successful
    def test_ratings_page(self):
        response = self.client.get(self.ratings_url, follow=True)
        self.assertEqual(response.status_code, 200)
    
    # send delete request to delete a rating
    # delete request returns 204 if successfully deleted
    # add first then delete
    def test_delete_request_for_ratings(self):
        self.client.post(self.ratings_url, self.rating_data, format='json')
        response = self.client.delete(self.ratings_url + '1/', follow=True)
        self.assertEqual(response.status_code, 204)
