from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from customers import views as customerviews
from products import views as productsviews
from Orders import views as ordersviews
from Shopping_Cart import views as cartviews
from Categories import views as categoryviews
from Invoice import views as invoiceviews

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    path('api/customers/', customerviews.CustomerList.as_view(), name="customers"),
    path('api/customers/<int:pk>/', customerviews.CustomerDetail.as_view()),
    path('api/customers/<email>/', customerviews.CustomerDetailByEmail.as_view()),

    path('api/products/', productsviews.ProductList.as_view(), name="products"),
    path('api/products/<int:pk>/', productsviews.ProductDetail.as_view()),
    path('api/products/<int:pk>/apply-sales-discount/', productsviews.ProductSalesDiscount.as_view()),


    path('api/comments/', productsviews.CommentList.as_view(), name="comments"),
    path('api/comments/<int:pk>/', productsviews.CommentDetail.as_view()),

    path('api/ratings/', productsviews.RatingList.as_view(), name="ratings"),
    path('api/ratings/<int:pk>/', productsviews.RatingDetail.as_view()),

    path('api/shopping_cart/', cartviews.ShoppingCartList.as_view(), name="shopping_cart"),
    path('api/shopping_cart/<int:pk>/', cartviews.ShoppingCartDetail.as_view()),

    path('api/categories/', categoryviews.CategoryList.as_view()),
    path('api/categories/<int:pk>/', categoryviews.CategoryDetail.as_view()),

    path('api/invoice/', invoiceviews.InvoiceList.as_view()),
    path('api/invoice/<int:pk>/', invoiceviews.InvoiceDetail.as_view()),

    path('api/orders/', ordersviews.OrderListView.as_view(), name="order"),
    path('api/orders/<int:pk>/', ordersviews.OrderDetailView.as_view())
    #path('api/orders/payment-confirmation/<int:order_id>/', ordersviews.payment_confirmation, name='payment-confirmation'),
]