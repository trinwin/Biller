from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    """

    User Manager for handling creation of Users and Superusers account
    Will add more username/password validation in the future

    """
    def create_user(self, email, password, ** extra_fields):
        if not email:
            raise ValueError('Email field is required')
    
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, ** extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault('is_active', True)
        if not email:
            raise ValueError('Email field is required')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user