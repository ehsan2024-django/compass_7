from django.shortcuts import render
import pandas as pd
from django.http import JsonResponse
import os
from django.conf import settings


def compass_view(request):
        # فرض کنیم این عدد از جایی محاسبه شده است
    needle_rotation = 200
    context = {
        'needle_rotation': needle_rotation,
    }
    return render(request, 'compass.html',context)

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