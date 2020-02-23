"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.conf.urls import url
from django.http import HttpResponse

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^dashboard/', lambda request: HttpResponse("Hi, dashboard page"), name='dashboard'),

    # Redirects all url that starts with auth/ to urls contained in Authentication module
    url(r'^auth/', include('Authentication.urls')),
    path('', lambda request: HttpResponse("landing page"), name='landing-page'),
]
