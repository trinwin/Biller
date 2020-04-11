from django.urls import path
from django.conf.urls import include
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^access-token/', views.get_access_token, name="access_token"),
    url(r'^transactions/', views.get_transactions, name="transactions"),
    url(r'^transactions-of-each-account/', views.get_transactions_of_each_account),
    url(r'^categories/', views.category_expenses, name="category-expenses"),
    url(r'^net-worth/', views.net_worth, name="net-worth"),
    url(r'^monthly-total-expenses/', views.monthly_total_expenses, name="monthly-total-expenses"),
    url(r'^bills/', views.bills, name="bills"),
]
