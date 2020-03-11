from django.contrib.auth.forms import UserCreationForm, UserChangeForm 

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