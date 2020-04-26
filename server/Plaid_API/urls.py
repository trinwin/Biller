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
    url(r'^monthly-total-income/', views.monthly_total_income, name="monthly-total-income"),
    url(r'^bills/', views.bills, name="bills"),
    url(r'^change-due-date/', views.change_due_date, name="change-due-date"),
    url(r'^graph-data/', views.graph_data, name="graph-data"),
    url(r'^get-notifications/', views.get_notifications, name="get_notifications"),
    url(r'^mark_notification_as_read/', views.mark_notification_as_read, name="mark_notification_as_read"),
]
