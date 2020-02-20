from django.contrib.auth.forms import UserCreationForm, UserChangeForm 

from .models import User 

class CustomerUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm):
        model = User 
        fields = ('email',)

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = User 
        fields = ('email',)