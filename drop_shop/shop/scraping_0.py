import requests
import re

from bs4 import BeautifulSoup
from decimal import Decimal

URL_SCRAPING_DOMAIN = "https://www.citilink.ru" # имя сайта, где происходит скрейпинг.

URL_SCRAPING = "https://www.citilink.ru/catalog/monitory" # точный адрес странцы, с которой извлекаются данные


def scraping():
    resp = requests.get(URL_SCRAPING, timeout=10.0)
    if resp.status_code != 200:
        raise Exception('HTTP error access!')

    data_list = []
    html = resp.text
    soup = BeautifulSoup(html, 'html.parser')
    blocks = soup.select('.app-catalog-fjtfe3')

    for block in blocks:
        data = {}
        name = block.select_one('.item-title[title]').get_text().strip()
        data['name'] = name

        print(data)

if __name__ == '__main__':
    scraping()

'''
{
    'name': 'Труба профильная 40х20 2 мм 3м', 
    'image_url': 'https://my-website.com/30C39890-D527-427E-B573-504969456BF5.jpg', 
    'price': Decimal('493.00'), 
    'unit': 'за шт', 
    'code': '38140012'
 }
 '''
    #    image_url = URL_SCRAPING_DOMAIN + block.select_one('img')['src']
    #    data['image_url'] = image_url

    #    price_raw = block.select_one('.item-price ').text
        # '\r\n \t\t\t\t\t\t\t\t\t\t\t\t\t\t493.00\t\t\t\t\t\t\t\t\t\t\t\t  руб. '
    #    price = re.findall(r'\S\d+\.\d+\S', price_raw)[0]
    #    price = Decimal(price)
    #    data['price'] = price   # 493.00

    #    unit = block.select_one('.unit ').text.strip()
        # '\r\n \t\t\t\t\t\t\t\t\t\t\t\t\t\tза шт\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'
    #    data['unit'] = unit  # 'за шт'   

'''----------------------------------------------------------------

    for name, price, url_detail in zip(names, prices, url_details):
        data = {}
        name = name.get("alt")
        image_url = name.get('src')
        price = price.get('data-meta-price')
        data["name"] = name
        data['image_url'] = image_url
        data['price'] = price
        
        url_details = url_detail.get("href")
        url_details = URL_SCRAPING + url_details
        
        soup = BeautifulSoup(html, 'lxml')
        code_block = soup.find("div", class_="app-catalog-n2vz38").find("span").text
        
        data['code'] = code_block
        
        data_list.append(data)
        print(data)

        for item in data_list:
            if not Product.objects.filter(code=item['code']).exists():
                Product.objects.create(
                    name=item['name'],
                    code=item['code'],
                    price=item['price'],
                    unit=item['unit'],
                    image_url=item['image_url'],
            )

        return data_list'''