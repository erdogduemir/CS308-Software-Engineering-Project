# Generated by Django 4.1.7 on 2023-05-04 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='pimage',
            field=models.CharField(blank=True, max_length=240, verbose_name='Product Image'),
        ),
    ]
