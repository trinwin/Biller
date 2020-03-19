from django.contrib.auth.forms import UserCreationForm, UserChangeForm 
from django.core.exceptions import ValidationError
from .validators import validate_email, validate_name
from django import forms
from .models import User 


class CustomerUserCreationForm(UserCreationForm):
    """
    Form for creating User with Django admin panel
    """
    class Meta(UserCreationForm):
        model = User 
        fields = ('email', 'first_name', 'last_name')

class CustomUserChangeForm(UserChangeForm):
    """
    Form for changing User information with Django admin panel
    """
    class Meta:
        model = User 
        fields = ('email', 'first_name', 'last_name')

class UserValidationForm(forms.ModelForm):
    """
    Form to validate email and password when registering accounts
    """

    class Meta:
        model = User 
        fields = ['email', 'password', 'first_name', 'last_name']




        
