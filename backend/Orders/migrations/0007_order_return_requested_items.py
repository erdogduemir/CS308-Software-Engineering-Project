# Generated by Django 4.1.7 on 2023-06-10 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0006_remove_order_isrefunded_order_refunded_items'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='return_requested_items',
            field=models.CharField(blank=True, max_length=240),
        ),
    ]
