from django.urls import path
from . import views

urlpatterns = [
    path('', views.compass_view   , name ='compass'),
    path('city-search/', views.city_search, name='city_search'),
    path('calculate_sun_position/', views.calculate_sun_position, name='calculate_sun_position'),

]