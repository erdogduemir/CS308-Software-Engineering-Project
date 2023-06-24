# Generated by Django 4.1.7 on 2023-05-04 16:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Categories', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pid', models.IntegerField()),
                ('pname', models.CharField(max_length=240, verbose_name='Product Name')),
                ('pmodel', models.CharField(max_length=240, verbose_name='Product Model')),
                ('pnumber', models.IntegerField(verbose_name='Doors')),
                ('pdescription', models.CharField(max_length=240, verbose_name='Product Description')),
                ('pstock', models.IntegerField(verbose_name='Stock')),
                ('pprice', models.IntegerField(verbose_name='Price')),
                ('pwarranty', models.CharField(max_length=240, verbose_name='Product Warranty')),
                ('pdistinfo', models.CharField(max_length=240, verbose_name='Product Distributor')),
                ('ppopularity', models.IntegerField(default=0)),
                ('pcategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Categories.category')),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rstars', models.FloatField()),
                ('rcreated_date', models.DateTimeField(auto_now_add=True)),
                ('rcustomer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('rproduct', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ctext', models.TextField()),
                ('ccreated_date', models.DateTimeField(auto_now_add=True)),
                ('c_is_approved', models.BooleanField(default=False)),
                ('ccustomer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('cproduct', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
        ),
    ]
