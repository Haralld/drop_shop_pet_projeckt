# Create your tests here.
# python3 manage.py test shop.tests --failfast


from django.test import TestCase
from django.contrib.auth.models import User
from django.core.management import call_command
from django.utils import timezone

from shop.models import Product, Payment, Order, OrderItem

import zoneinfo
from decimal import Decimal


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
        self.p = Product.objects.all().first()

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
        
    def find_cart_number(self):
        cart_number = Order.objects.filter(user=self.user, status=Order.STATUS_CART).count()
        return cart_number
    
    def test_function_get_cart(self):
        """
        Проверить число корзин
        1. Корзин нет
        2. Корзина создана
        3. Получена созданная корзина

        add @staticmethod Order.ger_cart(user)
        """

        #   1. Корзин нет
        self.assertEqual(self.find_cart_number(), 1)  # !!! поменять на 0 !!!
        
        #   2. Корзина создана
        Order.get_cart(self.user)
        self.assertEqual(self.find_cart_number(), 1)

        #   3. Получена созданная корзина
        Order.get_cart(self.user)
        self.assertEqual(self.find_cart_number(), 1)


    def test_cart_older_7_days(self):
        '''Проверить есть ли корзины старше 7 дней'''
        cart = Order.get_cart(self.user)
        cart.creation_time = timezone.datetime(2000, 1, 1, tzinfo=zoneinfo.ZoneInfo('UTC'))
        cart.save()
        cart = Order.get_cart(self.user)
        self.assertEqual((timezone.now() - cart.creation_time).days, 0)

    def test_recalculate_order_amount_after_changing_orderitem(self):
        '''
        Проверка суммы корзины
        1. Get order amount before any changing
        2. Get order amount after adding item/items
        3. Get order amount after deleting an item/items
        
        add amount to OrderItem as @property
        add Order.get_amount(user)
        '''
        
        #   1. Get order amount before any changing
        cart = Order.get_cart(self.user)
        self.assertEqual(cart.amount, Decimal(800)) # !!! поменять на 0 !!!
                         
        #   2. Get order amount after adding item
        i = OrderItem.objects.create(order=cart, product=self.p, price=2, quantity=2)
        i = OrderItem.objects.create(order=cart, product=self.p, price=2, quantity=3)

        cart = Order.get_cart(self.user)
        self.assertEqual(cart.amount, Decimal(810)) # !!! поменять на 10 !!!
                         
        #   3. Get order amount after deleting an item
        i.delete()
        cart = Order.get_cart(self.user)
        self.assertEqual(cart.amount, Decimal(804)) # !!! поменять на 4 !!!

        
    #def test_cart_status_changing_after_applying_make_order(self): # !!! вернуть к работе!!!
        """
        Изменение статуса карзины просле применения Order.make_order()
        1. Attempt to change the status for am empyty cart / Попытка изменить статус для пустой корзины
        2. Attempt to change the status for a non-empyty cart /Попытка изменить статус для не пустой корзины

        add Order.make_order()
        """
        

        # 1. Attempt to change the status for am empyty cart / Попытка изменить статус для пустой корзины
        #cart = Order.get_cart(self.user)
        #cart.make_order()
        #self.assertEqual(cart.status, Order.STATUS_CART)

        # 2. Attempt to change the status for a non-empyty cart /Попытка изменить статус для не пустой корзины
        #OrderItem.objects.create(order=cart, product=self.p, price=2, quantity=2)
        #cart.make_order()
        #self.assertEqual(cart.status, Order.STATUS_WAITING_FOR_PAYMENT)


    def test_method_get_amount_of_unpaid_orders(self):
        """получить сумму не оплаченных заказов
        1. До создания корзины
        2. После создания корзины
        3. После cart.make_order()
        4. После оплаты заказ
        5. После удаления всех заказ
        
        add Order.get_amount_of_unpaid_orders()
        """

        #   1. До создания корзины
        amount = Order.get_amount_of_unpaid_orders(self.user)
        self.assertEqual(amount, Decimal(0))
        

        #   2. После создания корзины
        cart = Order.get_cart(self.user)
        OrderItem.objects.create(order=cart, product=self.p, price=2, quantity=2)
        amount = Order.get_amount_of_unpaid_orders(self.user)
        self.assertEqual(amount, Decimal(0))
        
        #   3. После cart.make_order()
        cart.make_order()
        amount = Order.get_amount_of_unpaid_orders(self.user)
        self.assertEqual(amount, Decimal(804))                  # !!! проверить !!!
        
        #   4. После оплаты ордера
        cart.status = Order.STATUS_PAID
        cart.save()
        amount = Order.get_amount_of_unpaid_orders(self.user)
        self.assertEqual(amount, Decimal(0))

        #   5. После удаления всех ордеров
        Order.objects.all().delete()
        amount = Order.get_amount_of_unpaid_orders(self.user)
        self.assertEqual(amount, Decimal(0))
        

    def test_method_get_balance(self):
        """метод получения баланса
        1. До добавление платежа
        2. После добавление платежа
        3. После добавление одного платежа
        4. Без платежа

        add Payment.get_balance()
        """
        

        #   1. До добавление платежа
        amount = Payment.get_balance(self.user)
        self.assertEqual(amount, Decimal(800))

        #   2. После добавление платежа
        Payment.objects.create(user=self.user, amount=100)
        amount = Payment.get_balance(self.user)
        self.assertEqual(amount, Decimal(900))

        #   3. После добавление одного платежа
        Payment.objects.create(user=self.user, amount=-50)
        amount = Payment.get_balance(self.user)
        self.assertEqual(amount, Decimal(850))

        #   4. Без платежа
        Payment.objects.all().delete()
        amount = Payment.get_balance(self.user)
        self.assertEqual(amount, Decimal(0))


    def test_auto_payment_after_apply_make_order_true(self):
        '''Проверка платежа после make_order()
            есть необходимая сумма
        '''

        Order.objects.all().delete()
        cart = Order.get_cart(self.user)
        OrderItem.objects.create(order=cart, product=self.p, price=2, quantity=2)
        self.assertEqual(Payment.get_balance(self.user),Decimal(800))
        cart.make_order()
        self.assertEqual(Payment.get_balance(self.user),Decimal(796))

    
    def test_auto_payment_after_apply_make_order_false(self):
        '''Проверка платежа после make_order()
            нет необходимой сумма
        '''

        Order.objects.all().delete()
        cart = Order.get_cart(self.user)
        OrderItem.objects.create(order=cart, product=self.p, price=2, quantity=10000)
        cart.make_order()
        self.assertEqual(Payment.get_balance(self.user),Decimal(800))


    def test_auto_payment_after_add_required_payment(self):

        Payment.objects.create(user=self.user, amount=556)
        self.assertEqual(Payment.get_balance(self.user),Decimal(1356))
        amount = Order.get_amount_of_unpaid_orders(self.user)
        self.assertEqual(amount, Decimal(0))

    def test_auto_payment_for_earlier_order(self):

        cart = Order.get_cart(self.user)
        OrderItem.objects.create(order=cart, product=self.p, price=2, quantity=300)
        Payment.objects.create(user=self.user, amount=600)
        self.assertEqual(Payment.get_balance(self.user),Decimal(1400)) 
        amount = Order.get_amount_of_unpaid_orders(self.user)
        self.assertEqual(amount, Decimal(0)) # !!! возможна ошибка !!!


    def test_auto_payment_for_all_orders(self):

        cart = Order.get_cart(self.user)
        OrderItem.objects.create(order=cart, product=self.p, price=2, quantity=300)
        Payment.objects.create(user=self.user, amount=6000)
        self.assertEqual(Payment.get_balance(self.user),Decimal(6800)) 
        amount = Order.get_amount_of_unpaid_orders(self.user)
        self.assertEqual(amount, Decimal(0))