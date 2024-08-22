# Register your models here.

from django.contrib import admin
from shop.models import Product, Payment, OrderItem, Order

admin.site.register(Product)
admin.site.register(Payment)
admin.site.register(Order)
admin.site.register(OrderItem)


'''
class ItemsPhotoInline(admin.StackedInline):
    model = models.ItemsPhoto
    extra = 0
    min_num = None
    max_num = None

class ItemInline(admin.TabularInline):
    model = models.Item
    readonly_fields = ('final_price',)
    extra = 0
    min_num = None
    max_num = None

@admin.register(models.ItemInfo)
class ItemInfoAdmin(admin.ModelAdmin):
    list_display = ('name', 'summary', 'price')
    inlines = (ItemsPhotoInline,)

@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('customer', 'is_payed')
    inlines = (ItemInline,)

@admin.register(models.Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('username',)

'''