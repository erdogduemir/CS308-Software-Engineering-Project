# Generated by Django 4.1.7 on 2023-05-05 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0002_alter_order_order_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='all_products',
            field=models.CharField(blank=True, max_length=240),
        ),
    ]
