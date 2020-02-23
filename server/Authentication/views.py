from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from .models import User

@csrf_exempt
def login_page(request):
    # If user is authenticated, redirects them to dashboard page
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('dashboard'))
    
    # Only accepts POST requests
    if request.method == "POST":

        email = request.POST.get("email")
        password = request.POST.get("password")
        
        # Authenticate the user's email and password
        user = authenticate(username=email, password=password)
        if user is None:
            return HttpResponse("Login Failed")
        
        # Log the user in, creates a new JWT and saves it in the user's session
        auth_login(request, user)
        JWT_Token = RefreshToken.for_user(user)
        request.user.refresh_token = str(JWT_Token)
        request.user.access_token = str(JWT_Token.access_token)
        return HttpResponse("Login Success")
    return HttpResponse("Login must take a POST request")

@csrf_exempt
def register_page(request):
    # If user is logged in already, redirects to dashboard
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('dashboard'))

    # Only accepts POST requests
    if request.method == 'POST':

        email = request.POST.get("email")
        password1 = request.POST.get("password1")
        password2 = request.POST.get('password2')

        # If password and password confirmation matches
        if password1 == password2:

            user = authenticate(username=email, password=password1)
            
            # If no such user is found in the database
            if user is None and len(User.objects.filter(email=email)) == 0:
                # Create a new user object and then logs them in
                user = User.objects.create_user(email=email, password=password1)
                auth_login(request, user)
                return HttpResponse("Registration successful")
        
        return HttpResponse("Registration failed.")
    
    return HttpResponse("Register must take a POST request")


@csrf_exempt
def logout(request):
    # If user is already logged in, log them out and redirects to landing page
    if request.user.is_authenticated:
        auth_logout(request)

    return HttpResponseRedirect(reverse('landing-page'))

