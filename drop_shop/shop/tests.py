# Create your tests here.
# python3 manage.py test shop.tests --failfast


from django.test import TestCase
from django.contrib.auth.models import User
from django.core.management import call_command

from shop.models import Product, Payment, Order, OrderItem

class TestDataBase(TestCase):
    fixtures = ["shop/fixtures/data.json"]

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        # Выполнить команду для очистки ContentType
        call_command('clear_content_types')

    def setUp(self):
        # Получить пользователя, используя его username
        self.user = User.objects.get(username='root')

    def test_user_exists(self):
        # Проверить, что пользователь существует
        users = User.objects.all()
        users_number = users.count()
        self.assertEqual(users_number, 1, "Пользователь не был найден.")
        user = users.first()
        self.assertEqual(user.username, 'root', "Имя пользователя не совпадает.")
        self.assertTrue(user.is_superuser, "Пользователь не является суперпользователем.")

    def test_user_check_password(self):
        # Проверить, что пароль пользователя корректный
        self.assertTrue(self.user.check_password('123'), "Пароль пользователя неверен.")

    def test_all_data(self):
        self.assertGreater(Product.objects.all().count(), 0)
        self.assertGreater(Order.objects.all().count(), 0)
        self.assertGreater(OrderItem.objects.all().count(), 0)
        self.assertGreater(Payment.objects.all().count(), 0)
        

