from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomerManager(BaseUserManager):
    def create_user(self, email, name, surname, tax_id, home_address, wishList, is_staff, is_superuser, password=None):
        if not email:
            raise ValueError('You must have an email in order to sign in.')
        
        email = self.normalize_email(email)
        customer = self.model(email = email, name = name, surname = surname, tax_id = tax_id, home_address = home_address,
                              wishList = wishList, is_staff = is_staff, is_superuser = is_superuser)
        customer.set_password(password)
        customer.save()

        return customer
    
    def create_superuser(self, email, name, surname, tax_id, home_address, password):
        user = self.create_user(
            email=email,
            name=name,
            surname=surname,
            tax_id=tax_id,
            home_address=home_address,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Customer(AbstractBaseUser, PermissionsMixin):
    name = models.CharField("Name", max_length=240)
    surname = models.CharField("Surname", max_length=240)
    tax_id = models.CharField(max_length=20, default = 'N/A')    
    email = models.EmailField(max_length=240, unique=True)
    home_address = models.CharField(max_length=255, default = 'N/A')
    password = models.CharField(max_length=255, blank=True)
    cshoppingcart = models.OneToOneField('Shopping_Cart.ShoppingCart', null=True, on_delete=models.CASCADE)
    wishList = models.CharField(max_length=1000, blank=True)
    notificationList = models.CharField(max_length=1000, blank=True)
   
    
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)


    objects = CustomerManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'surname', 'tax_id', 'home_address', 'wishList', 'notificationList', 'is_staff', 'is_superuser']

    def __str__(self):
        return self.email
    
    @property
    def get_full_name(self):
        return str(self.name) + " " + str(self.surname)
    
    @property
    def get_short_name(self):
        return self.name

    @property
    def get_email(self):
        return self.email
    
    @property
    def get_home_address(self):
        return self.home_address
    
    @property
    def get_tax_id(self):
        return self.tax_id
    
    @property
    def get_orders(self):
        return self.orders
