from django.test import TestCase
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.core.exceptions import ObjectDoesNotExist
from .models import User
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
        try:
            User.objects.create_user(email="normal@user.com", password="foo")
        except:
            pass
    
    def test_invalid_password(self):
        User.objects.create_user(email="normal@user.com", password="foo")
        user = authenticate(email='normal@user.com', password="foo")
        user = authenticate(email="normal@user.com", password="")
        if user is None:
            pass
        else:
            raise ObjectDoesNotExist

            

 


    