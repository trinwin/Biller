from django.shortcuts import render
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from .models import BankAccounts
from Authentication.models import User as User_Model
import datetime
import json
import time
import plaid
import os
# Create your views here.

PLAID_CLIENT_ID = '5e69b65f584f98001426e625'
PLAID_SECRET = 'fb3902da2745d2ea1d60dd553fbb47'
PLAID_PUBLIC_KEY = '716f1a504cda22791ca574fbcb4736'

PLAID_ENV = os.getenv('PLAID_ENV', 'sandbox')
PLAID_PRODUCTS = os.getenv('PLAID_PRODUCTS', 'transactions')
PLAID_COUNTRY_CODES = os.getenv('PLAID_COUNTRY_CODES', 'US')
PLAID_OAUTH_REDIRECT_URL = os.getenv('PLAID_OAUTH_REDIRECT_URL', '')
PLAID_OAUTH_NONCE = os.getenv('PLAID_OAUTH_NONCE', '')

client = plaid.Client(client_id=PLAID_CLIENT_ID, secret=PLAID_SECRET, public_key=PLAID_PUBLIC_KEY,
                      environment=PLAID_ENV, api_version='2019-05-29')


@csrf_exempt
@api_view(['POST'])
# These 2 decorators are for bypassing JWT token authentication for testing purposes
# @authentication_classes([])
# @permission_classes([])
def get_access_token(request):

    # Must provides the user's email
    email = request.data.get('email')
    if email is None:
        return Response({'err': "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    body = json.loads(request.body)
    public_token = body['public_token']
    # Exchanges the public token for an access token
    # Create a "link" to the user's bank account
    try:
        response = client.Item.public_token.exchange(public_token)
    except plaid.errors.PlaidError as err:
        return Response({"err": err.message}, status=status.HTTP_406_NOT_ACCEPTABLE)

    # Get the access token and query for the user object with the user's email
    access_token = response['access_token']
    user = User_Model.objects.filter(email=email)
    # If email is not found in database, error
    if user is None or len(user) == 0:
        return Response({"err": "Email not found"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    try:
        # Using the access token, retrieve the user's financial accounts
        response = client.Accounts.get(access_token)
        # For each accounts, create a new BankAccount object in database
        # Save the user's email, access token, and account_id for each object
        for account in response["accounts"]:
            BankAccounts.objects.create(user=user[0], access_token=access_token,
                                        account_id=account["account_id"])
    except plaid.errors.PlaidError as err:
        return Response({"err": err.message}, status=status.HTTP_403_FORBIDDEN)

    return Response({'message': 'Success'})


@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
# @authentication_classes([])
# @permission_classes([])
def get_transactions(request):

    # Provide user's email or error
    email = request.data.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    try:
        user = User_Model.objects.filter(email=email)
        # If email is not found in database, error
        if user is None or len(user) == 0:
            return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get the list of distincts access_token associated with this user
        access_tokens = BankAccounts.objects.filter(user=user[0]).values("access_token").distinct()
        # If no access token found, return error
        if access_tokens is None or len(access_tokens) == 0:
            return Response({"err": "No account found"}, status=status.HTTP_404_NOT_FOUND)

        # The start and end date for transactions (how far back we want)
        start_date = '{:%Y-%m-%d}'.format(datetime.datetime.now() + datetime.timedelta(-30))
        end_date = '{:%Y-%m-%d}'.format(datetime.datetime.now())

        response = []

        # For each distinct access token, make an API call to get the transactions
        for access_token in access_tokens:

            # Make a list of account ids associated with each access token
            account_ids = BankAccounts.objects.filter(
                user=user[0], access_token=access_token["access_token"]).values("account_id")
            list_of_account_ids = [account_id["account_id"] for account_id in account_ids]

            # Make an API call to get the transactions, and then append the result to
            # the response list
            response.append(client.Transactions.get(access_token["access_token"], start_date,
                                                    end_date, account_ids=list_of_account_ids))

    except plaid.errors.PlaidError as err:
        return Response({'message': err.message})

    """
    print("Accounts associated with this link")
    for account in response['accounts']:
        print("--------------------------------------")
        print("Type: ", account['subtype'])
        print("Name: ", account['official_name'])
        print("Type: ", account['type'])
        print("Available: ", account['balances']['available'])
        print("Current balance: ", account['balances']['current'])
        if account['subtype'] == 'credit':
            print('Limit: ', account['limit'])
        print("--------------------------------------")
    print("Transactions: ")
    for transaction in response['transactions']:
        print("-----------------------------------------")
        print("Categories: ", str([category for category in transaction['category']]))
        print("Name: ", transaction['name'])
        print("Payment Channel: ", transaction['payment_channel'])
        print("Payment Amount: ", transaction['amount'])
        print("Payment Date: ", transaction['date'])
        print("Payment Pending: ", transaction['pending'])
        print("-----------------------------------------")
    """

    """
    for transaction in response['transactions']:
        print(transaction)
    """
    return Response({'transactions': response})


@csrf_exempt
@api_view(['GET'])
# The 2 decorators below is for bypassing JWT authentication for testing purposes
# @authentication_classes([])
# @permission_classes([])
def get_accounts(request):
    # Provide user's email or fail
    email = request.data.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    try:
        # If email is not found in database, fail
        user = User_Model.objects.filter(email=email)
        if user is None or len(user) == 0:
            return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        # Get list of distinct access tokens
        access_tokens = BankAccounts.objects.filter(user=user[0]).values("access_token").distinct()
        response = []
        # For each access token, make an API call to get all the accounts associated with it
        for access_token in access_tokens:
            response.append(client.Accounts.get(access_token=access_token["access_token"]))
    except plaid.errors.PlaidError as err:
        return Response({'message': err.message})

    return Response({'accounts': response})


@csrf_exempt
@api_view(['GET'])
# The 2 decorators below are for bypassing JWT authentication for testing purposes
# @authentication_classes([])
# @permission_classes([])
def get_balances(request):
    # Provide user's email or fail
    email = request.data.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    try:
        # If email is not found in db, fail
        user = User_Model.objects.filter(email=email)

        if user is None or len(user) == 0:
            return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get list of distinct access tokens
        access_tokens = BankAccounts.objects.filter(user=user[0]).values("access_token").distinct()
        response = []
        # For each access token, make an API call to get the balances of all accounts
        # associated with this access token
        for access_token in access_tokens:
            response.append(client.Accounts.balance.get(access_token=access_token["access_token"]))
    except plaid.errors.PlaidError as err:
        return Response({'message': err.message})
    return Response({'balances': response})
