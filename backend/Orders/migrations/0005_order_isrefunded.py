# Generated by Django 4.1.7 on 2023-05-26 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0004_order_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='isRefunded',
            field=models.BooleanField(default=False),
        ),
    ]
