from django.urls import path
from . import views

urlpatterns = [
    path('', views.compass_view   , name ='compass'),
    path('city-search/', views.city_search, name='city_search'),

]