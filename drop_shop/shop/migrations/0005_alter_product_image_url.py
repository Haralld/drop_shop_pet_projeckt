# Generated by Django 5.0.6 on 2024-09-01 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("shop", "0004_alter_product_code_alter_product_image_url_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="image_url",
            field=models.URLField(default=None),
        ),
    ]
