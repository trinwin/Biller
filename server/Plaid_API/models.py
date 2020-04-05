from django.db import models
from Authentication.models import User as User_Model

# Create your models here.
class BankAccounts(models.Model):
    user = models.ForeignKey(User_Model, on_delete=models.CASCADE)
    access_token = models.CharField(max_length = 100, blank = False)    
    account_id = models.CharField(max_length = 100, blank= False)
