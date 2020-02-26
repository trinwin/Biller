from django.db import models
from django.contrib.auth.models import AbstractUser 
from .managers import UserManager 
from .validators import validate_email, validate_name, validate_password

class User(AbstractUser):

    # Remove username field use email as primary key
    username = None 
    email = models.EmailField('Email address',  unique = True, validators=[validate_email])
    password = models.CharField(max_length = 30, validators=[validate_password])
    first_name = models.CharField(max_length = 25, validators=[validate_name])
    last_name = models.CharField(max_length = 25, validators=[validate_name])

    # Username field is now email
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    # All Users object will have to be created by UserMananger
    objects = UserManager()
    
    def __str__(self):
        return self.email


