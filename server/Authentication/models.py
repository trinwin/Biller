from django.db import models
from django.contrib.auth.models import AbstractUser 
from .managers import UserManager 

class User(AbstractUser):

    # Remove username field use email as primary key
    username = None 
    email = models.EmailField('Email address', unique = True)

    # Username field is now email
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # All Users object will have to be created by UserMananger
    objects = UserManager()
    
    def __str__(self):
        return self.email


