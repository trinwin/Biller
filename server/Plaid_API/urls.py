from django.urls import path
from django.conf.urls import include
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^access-token/', views.get_access_token, name="access_token"),
    url(r'^transactions/', views.get_transactions, name="transactions"),
<<<<<<< HEAD
    url(r'^categories/', views.category_expenses, name="category-expenses"),
    url(r'^net-worth/', views.net_worth, name="net-worth"),
    url(r'^bills/', views.bills, name="bills"),
=======
    url(r'accounts/', views.get_accounts, name="get-accounts"),
    url(r'balances', views.get_balances, name="balances"),
>>>>>>> 6c4e449... Implemented Plaid API & Transaction Schema
]