from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from models import Product 
import requests
import time
import os
import django
import json

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'drop_shop.settings')
django.setup()

# Constants
URL_SCRAPING_DOMAIN = "https://www.citilink.ru"
URL_SCRAPING = "https://www.citilink.ru/catalog/monitory"

def scraping():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    try:
        driver.get(URL_SCRAPING)
        time.sleep(5)  # Wait for page to fully load
    except Exception as e:
        print(f"Error loading main page: {e}")
        driver.quit()
        return

    html = driver.page_source
    soup = BeautifulSoup(html, 'lxml')

    # Extract product names, prices, and detail URLs
    names = soup.find_all("img", {"class": ["emd6ru10", "app-catalog-1ljntpj"]}) 
    prices = soup.find_all("span", {"class": ["app-catalog-0", "eb8dq160"]})
    url_details = soup.find_all("a", {"class": ["app-catalog-fjtfe3", "e1lhaibo0"]})

    data_list = []

    for name_tag, price_tag, url_detail in zip(names, prices, url_details):
        try:
            data = {}
            name = name_tag.get("alt")
            image_url = name_tag.get('src')
            price = price_tag.get('data-meta-price')
            data["name"] = name
            data['image_url'] = image_url
            data['price'] = price

            # Navigate to the product detail page to extract the product code
            product_url = URL_SCRAPING_DOMAIN + url_detail.get("href")
            driver.get(product_url)
            time.sleep(3)  # Wait for page to fully load

            product_html = driver.page_source
            product_soup = BeautifulSoup(product_html, 'lxml')
            
            # Extract product code
            code_block = product_soup.find("div", class_="app-catalog-n2vz38").find("span")
            if code_block:
                product_code = code_block.text.strip().replace("Код товара: ", "")
                data['code'] = product_code
            else:
                data['code'] = "Not found"

            # Debug print to check extracted data
            print("Extracted Data:")
            print(json.dumps(data, ensure_ascii=False, indent=4))

            # Add the extracted data to the list
            data_list.append(data)

        except Exception as e:
            print(f"Error scraping product: {e}")

    driver.quit()

    # Save all the data to the database
    saved_count = 0
    for item in data_list:
        try:
            Product.objects.create(
                name=item['name'],
                price=item['price'],
                image_url=item['image_url'],
                code=item['code']
            )
            saved_count += 1
            print(f"Saved product: {item['name']}")
        except Exception as e:
            print(f"Error saving product {item['name']}: {e}")

    # Final summary of operation
    print(f"Total extracted products: {len(data_list)}")
    print(f"Total saved products: {saved_count}")

    return data_list


if __name__ == '__main__':
    scraping()
