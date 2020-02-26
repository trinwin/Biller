from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404. JsonResponse
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
import django.core.exceptions as exceptions
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from .models import User
from rest_framework import status


@csrf_exempt
@api_view(['POST'])
# Authentication class & permission class is empty for login (anyone can access)
@authentication_classes([])
@permission_classes([])
def login_page(request):
    # If user is authenticated, redirects them to dashboard page
    # Trinh forgets this remove if u want :)
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('dashboard'))

    # Only accepts POST requests
    if request.method == "POST":

        email = request.data.get("email")
        password = request.data.get("password")
        # print(request.data)
        print(email)
        print(password)
        # Authenticate the user's email and password
        user = authenticate(username=email, password=password)
        print(user)
        if user is None:
            user = User.objects.filter(email=email)
            if len(user) == 0:
                return JsonResponse({'message': "Account does not exist"}, 401)
            if not user[0].check_password(password):
                return Response({'message': "Invalid password"})
        # Log the user in, creates a new JWT and saves it in the user's session
        auth_login(request, user)
        JWT_Token = RefreshToken.for_user(user)
        request.user.refresh_token = str(JWT_Token)
        request.user.access_token = str(JWT_Token.access_token)
        return Response({'email': email, 'refresh_token': request.user.refresh_token,
                         'access_token': request.user.access_token})
    return Response({'message': "Login must take a POST request"})


@csrf_exempt
@api_view(['POST'])
# Authentication class & permission class is empty for register (anyone can access)
@authentication_classes([])
@permission_classes([])
def register_page(request):
    # If user is logged in already, redirects to dashboard
    # Forget about this delete if u want to
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('dashboard'))

    # Only accepts POST requests
    if request.method == 'POST':

        email = request.POST.get("email")
        password = request.POST.get("password")
        password2 = request.POST.get('password2')
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")

        # If password and password confirmation matches
        if password == password2:
            user = User(email=email, password=password,
                        first_name=first_name, last_name=last_name)
            try:
                user.full_clean()
            except exceptions.ValidationError as err:
                return Response(err.message_dict)

            user = authenticate(username=email, password=password)

            # If no such user is found in the database
            if user is None and len(User.objects.filter(email=email)) == 0:
                # Create a new user object and then logs them in
                user = User.objects.create_user(
                    email=email, password=password, first_name=first_name, last_name=last_name)
                auth_login(request, user)
                JWT_Token = RefreshToken.for_user(user)
                request.user.refresh_token = str(JWT_Token)
                request.user.access_token = str(JWT_Token.access_token)
                return Response({'email': email, 'refresh_token': request.user.refresh_token,
                                 'access_token': request.user.access_token})
            else:
                return Response({'message': "An account with this email already exists."})
        else:
            return Response({'message': "Password confirmation does not match."})

    return Response({'message': "Register must take a POST request."})


@csrf_exempt
@api_view(['POST'])
def logout(request):
    # If user is already logged in, log them out and redirects to landing page
    if request.user.is_authenticated:
        auth_logout(request)

    return HttpResponseRedirect(reverse('landing-page'))
