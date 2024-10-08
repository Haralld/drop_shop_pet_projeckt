# Generated by Django 5.0.6 on 2024-09-01 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("shop", "0002_alter_product_code_alter_product_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="code",
            field=models.CharField(max_length=255, verbose_name="product_code"),
        ),
        migrations.AlterField(
            model_name="product",
            name="name",
            field=models.CharField(max_length=255, verbose_name="product_name"),
        ),
    ]
