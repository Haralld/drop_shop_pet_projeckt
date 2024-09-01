from django.core.management.base import BaseCommand
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
from shop.models import Product

class Command(BaseCommand):
    help = 'Scrape data from Citilink'

    def handle(self, *args, **kwargs):
        URL_SCRAPING_DOMAIN = "https://www.citilink.ru"
        URL_SCRAPING = "https://www.citilink.ru/catalog/monitory"

        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        
        driver.get(URL_SCRAPING)
        time.sleep(5)
        html = driver.page_source
        driver.quit()

        soup = BeautifulSoup(html, 'lxml')
        names = soup.find_all("img", {"class" : "emd6ru10", "class" : "app-catalog-1ljntpj"}) 
        prices = soup.find_all("span", {"class" : "app-catalog-0", "class": "eb8dq160"})
        url_details = soup.find_all("a", {"class" : "app-catalog-fjtfe3", "class" : "e1lhaibo0"})

        data_list = []

        for name, price, url_detail in zip(names, prices, url_details):
            data = {}
            title = name.get("alt")
            image_url = name.get('src')
            price = price.get('data-meta-price')
            data["name"] = title
            data['image_url'] = image_url
            data['price'] = price
            data_list.append(data)

            for item in data_list:
                if not Product.objects.filter(name=item['name']).exists():
                    Product.objects.create(
                        name=item['name'],
                        price=item['price'],
                        image_url=item['image_url'],
                    )

            self.stdout.write(self.style.SUCCESS('Successfully scraped and saved data'))
