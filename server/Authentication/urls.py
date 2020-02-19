from django.urls import path
from django.conf.urls import include
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^login/', views.login_page, name = 'login'),
    url(r'^register/', views.register_page, name='register'),
]
