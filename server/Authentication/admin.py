from django.contrib import admin
from .models import User
from .forms import CustomerUserCreationForm, CustomUserChangeForm
from Plaid_API.models import BankAccounts
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    """
    Specify display for custom user model in Django admin panel
    """
    add_form = CustomerUserCreationForm
    form = CustomUserChangeForm
    model = User 

    list_display = ('email', 'first_name', 'last_name',\
                    'is_staff', 'is_active', )

    list_filter = ('email', 'first_name', 'last_name',\
                    'is_staff', 'is_active', )
    
    fieldsets = ( (None, {'fields': ('email', 'password', 'first_name', 'last_name')}) ,\
                ( 'Permissions', {'fields': ('is_staff', 'is_active')})\
                )

    add_fieldsets = ( (None, { 'classes': ('wide'), \
                              'fields': ('email', 'password1', 'password2',\
                                         'is_staff', 'is_active')})\
                    )
    
    search_fields = ('email',)
    ordering = ('email',)

# Register it with admin panel
admin.site.register(User, CustomUserAdmin)
admin.site.register(BankAccounts)
