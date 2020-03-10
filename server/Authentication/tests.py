from django.test import TestCase
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
import django.core.exceptions as exceptions
import django.db as dbexceptions
from .models import User
from .forms import UserValidationForm
# Create your tests here.

class UserTestCase(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', password='foo')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser('super@user.com', 'foo')
        self.assertEqual(admin_user.email, 'super@user.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
    
    def test_duplicate_accounts(self):
        User.objects.create_user(email="normal@user.com", password="foo")
        with self.assertRaises(dbexceptions.IntegrityError) as exception_manager:
            User.objects.create_user(email="normal@user.com", password="oof")

    
    def test_invalid_password(self):
        with self.assertRaisesMessage(exceptions.ValidationError,"Passwords need to be longer than 8"):
            user = User(email="test@user.com", password="foo")
            user.full_clean()
        User.objects.create_user(email="normal@user.com", password="foo")
        user = authenticate(email='normal@user.com', password="foo")
        self.assertNotEqual(None, user)
        user = authenticate(email="normal@user.com", password="")
        self.assertEqual(None, user)
    
    def test_invalid_email(self):
        with self.assertRaisesMessage(exceptions.ValidationError,"Email domain not recognized"):
            user = User(email = 'abc@abc.com', password = 'foo', first_name = 'first', last_name = 'last')
            user.full_clean()
        with self.assertRaisesMessage(exceptions.ValidationError,"Illegal email naming convention"):
            user = User(email = '-abc@yahoo.com', password = 'foo', first_name = 'first', last_name = 'last')
            user.full_clean()
        with self.assertRaisesMessage(exceptions.ValidationError,"Illegal character in email"):
            user = User(email = 'abc<@yahoo.com', password = 'foo', first_name = 'first', last_name = 'last')
            user.full_clean()
    
    def test_invalid_name(self):
        with self.assertRaisesMessage(exceptions.ValidationError,"Names can only contain alphabet letters"):
            user = User(email = 'abc@yahoo.com', password = 'foo', first_name = 'first123', last_name = 'last')
            user.full_clean()
        with self.assertRaisesMessage(exceptions.ValidationError,'This field cannot be blank.'):
            user = User(email = 'abc@yahoo.com', password = 'foo', last_name = 'last')
            user.full_clean()
        with self.assertRaisesMessage(exceptions.ValidationError,'This field cannot be blank.'):
            user = User(email = 'abc@yahoo.com', password = 'foo', first_name = 'first')
            user.full_clean()
        

            

 


    