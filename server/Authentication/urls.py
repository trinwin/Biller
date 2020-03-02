from django.urls import path
from django.conf.urls import include
from django.conf.urls import url
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    url(r'^login/', views.login_page, name = 'login'),
    url(r'^api/obtain-token/', TokenObtainPairView.as_view()),
    url(r'^api/refresh-token/', TokenRefreshView.as_view()),
    url(r'^register/', views.register_page, name='register'),
    url(r'^logout/', views.logout, name='logout'),
]
