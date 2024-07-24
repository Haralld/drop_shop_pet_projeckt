# Create your views here.

from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about-us.html')

def services(request):
    return render(request, 'services.html')

def shop_list(request):
    return render(request, 'shop-list.html')

def shop_detail(request):
    return render(request, 'shop-detail.html')

def cart(request):
    return render(request, 'cart.html')

def check_out(request):
    return render(request, 'check-out.html')

def portfolio(request):
    return render(request, 'portfolio.html')

def portfolio_single(request):
    return render(request, 'portfolio-single.html')

def blog(request):
    return render(request, 'blog.html')

def blog_single(request):
    return render(request, 'blog-single.html')

def contacts(request):
    return render(request, 'contacts.html')

