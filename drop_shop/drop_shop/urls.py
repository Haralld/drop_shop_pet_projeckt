"""
URL configuration for drop_shop project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from drop_shop import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('shop_list/', views.shop_list, name='shop_list'),
    path('shop_detail/', views.shop_detail, name='shop_detail'),
    path('cart/', views.cart, name='cart'),
    path('check_out/', views.check_out, name='check_out'),
    path('portfolio/', views.portfolio, name='portfolio'),
    path('portfolio_single/', views.portfolio_single, name='portfolio_single'),
    path('blog/', views.blog, name='blog'),
    path('blog_single/', views.blog_single, name='blog_single'),
    path('contacts/', views.contacts, name='contacts'),
    path("admin/", admin.site.urls),

    path('auth/', include('authentication.urls')),
]
