from django.shortcuts import render
import pandas as pd
import os
from django.conf import settings
from django.http import JsonResponse
from datetime import datetime
import ephem
import pytz
from math import degrees


def compass_view(request):
        # فرض کنیم این عدد از جایی محاسبه شده است
    needle_rotation = 200
    context = {
        'needle_rotation': needle_rotation,
    }
    return render(request, 'compass.html',context)

def calculate_sun_position(request):
    # دیکشنری زوایای قبله برای شهرهای مختلف
    QIBLA_ANGLES = {
        'tehran': 218,
        'mashhad': 234,
        'isfahan': 226,
        'shiraz': 237,
        'tabriz': 200,
        'urmia': 197,
        'ghaemshahr': 220.57
    }
    # دریافت نام شهر از درخواست
    city_name = request.GET.get('city', '')
    
    # دیکشنری شهرها و مختصات آنها
    CITIES = {
        'tehran': {'lat': '35.6892', 'lon': '51.3890', 'elevation': 1189},
        'mashhad': {'lat': '36.2605', 'lon': '59.6168', 'elevation': 999},
        'isfahan': {'lat': '32.6546', 'lon': '51.6680', 'elevation': 1574},
        'shiraz': {'lat': '29.5926', 'lon': '52.5836', 'elevation': 1484},
        'tabriz': {'lat': '38.0962', 'lon': '46.2738', 'elevation': 1351},
        'urmia': {'lat': '37.5498', 'lon': '45.0786', 'elevation': 1351},
        'ghaemshahr': {'lat': '36.4635', 'lon': '52.8578', 'elevation': 1351}
    }
    
    # بررسی وجود شهر در لیست
    city = CITIES.get(city_name.lower())
    if not city:
        return JsonResponse({'error': 'City not found'}, status=404)
    
    try:
        # تنظیم موقعیت ناظر
        observer = ephem.Observer()
        observer.lat = city['lat']
        observer.lon = city['lon']
        observer.elevation = city['elevation']
        
        # تنظیم زمان فعلی
        tehran_tz = pytz.timezone('Asia/Tehran')
        current_time = datetime.now(tehran_tz)
        observer.date = current_time
        
        # محاسبه موقعیت خورشید
        sun = ephem.Sun()
        sun.compute(observer)
        
        # تبدیل زاویه‌ها به درجه
        azimuth = degrees(float(sun.az))
        altitude = degrees(float(sun.alt))
          
        # دریافت زاویه قبله برای شهر
        qibla_angle = QIBLA_ANGLES.get(city_name.lower(), 100)
        #print("aaaaaa",qibla_angle)
        
        
        # برگرداندن نتایج
        return JsonResponse({
            'success': True,
            'city': city_name,
            'datetime': current_time.strftime('%Y-%m-%d %H:%M:%S'),
            'azimuth': round(azimuth, 2),  # سمت خورشید
            'altitude': round(altitude, 2), # ارتفاع خورشید
            'qibla_angle': qibla_angle,  # زاویه قبله
            'coordinates': {
                'latitude': city['lat'],
                'longitude': city['lon']
            }
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)

def get_city_coordinates(city_name):
    # مسیر جدید فایل اکسل در پوشه static سطح پروژه
    excel_path = os.path.join(settings.BASE_DIR, 'static', 'cities.xlsx')
    
    try:
        # خواندن فایل اکسل
        df = pd.read_excel(excel_path)
        
        # اضافه کردن لاگ برای اطمینان از خواندن فایل
        print(f"Excel file loaded successfully from: {excel_path}")
        print(f"Number of cities loaded: {len(df)}")
        
        # جستجوی شهر
        city_data = df[df['name'].str.contains(city_name, case=False, na=False)]
        
        # تبدیل به لیست دیکشنری‌ها
        cities = []
        for _, row in city_data.iterrows():
            cities.append({
                'name': row['name'],
                'lat': float(row['latitude']),
                'lng': float(row['longitude'])
            })
        
        # لاگ نتایج جستجو
        print(f"Found {len(cities)} matches for search term: {city_name}")
        return cities
    
    except Exception as e:
        print(f"Error reading Excel file from {excel_path}: {e}")
        return []
    
def city_search(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        search_term = request.GET.get('term', '')
        cities = get_city_coordinates(search_term)
        print("aaaaaa:  ",cities)
        return JsonResponse(cities, safe=False)
    return render(request, 'city_search.html')