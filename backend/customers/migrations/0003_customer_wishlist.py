# Generated by Django 4.1.7 on 2023-06-08 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("customers", "0002_customer_cshoppingcart"),
    ]

    operations = [
        migrations.AddField(
            model_name="customer",
            name="wishList",
            field=models.CharField(blank=True, max_length=1000),
        ),
    ]