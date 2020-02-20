from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response 
# Create your views here.

def login_page(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('dashboard'))
    return HttpResponse("Hello, Login Page")

def register_page(request):
    return HttpResponse("Hello, Register Page")

@api_view(['GET', 'POST'])
def hello_world(request):
    if request.method == 'POST':
        return Response({'message': 'Got data'})
    return Response({'message': "HELLO WORLD"})

