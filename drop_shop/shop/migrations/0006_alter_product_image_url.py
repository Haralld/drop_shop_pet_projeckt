# Generated by Django 5.0.6 on 2024-09-01 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("shop", "0005_alter_product_image_url"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="image_url",
            field=models.URLField(default="images/default.jpg"),
        ),
    ]
