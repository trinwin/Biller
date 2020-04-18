from django.db import models
from Authentication.models import User as User_Model

# Create your models here.


class BankAccounts(models.Model):
    user = models.ForeignKey(User_Model, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=100, blank=False)
    account_id = models.CharField(max_length=100, blank=False, primary_key=True)
    type = models.CharField(max_length=100, blank=False)
    name = models.CharField(max_length=255, blank=False, null=True)
    balance = models.FloatField(blank=False)


class Transactions(models.Model):
    category = models.CharField(max_length=100, blank=False)
    name = models.CharField(max_length=255, blank=False, null=True)
    date = models.DateField(auto_now=False, auto_now_add=False, blank=False)
    account_id = models.ForeignKey(BankAccounts, on_delete=models.CASCADE)
    amount = models.FloatField(blank=False)
    pending_status = models.BooleanField(blank=False)
    transaction_id = models.CharField(max_length=100, blank=False, primary_key=True)


class Bill(models.Model):
    account_id = models.ForeignKey(BankAccounts, on_delete=models.CASCADE)
    amount = models.FloatField(blank=False)
    due_date = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    notified = models.BooleanField(default=False)

    def __str__(self):
        return str(self.due_date) + " " + str(self.amount)
