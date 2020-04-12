from django.shortcuts import render
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from .models import BankAccounts
from Authentication.models import User as User_Model
from .models import Transactions, Bill
from django.db.models import Sum
from dateutil.relativedelta import relativedelta
import datetime
import json
import time
import plaid
import os
# Create your views here.

PLAID_CLIENT_ID = '5e69b65f584f98001426e625'
PLAID_SECRET = '4a91b824095bb42f8661a2906e82f0'
PLAID_PUBLIC_KEY = '716f1a504cda22791ca574fbcb4736'

PLAID_ENV = os.getenv('PLAID_ENV', 'development')
PLAID_PRODUCTS = os.getenv('PLAID_PRODUCTS', 'transactions')
PLAID_COUNTRY_CODES = os.getenv('PLAID_COUNTRY_CODES', 'US,CA,GB,FR,ES')
PLAID_OAUTH_REDIRECT_URL = os.getenv('PLAID_OAUTH_REDIRECT_URL', '')
PLAID_OAUTH_NONCE = os.getenv('PLAID_OAUTH_NONCE', '')

client = plaid.Client(client_id=PLAID_CLIENT_ID, secret=PLAID_SECRET, public_key=PLAID_PUBLIC_KEY,
                      environment=PLAID_ENV, api_version='2019-05-29')


@csrf_exempt
@api_view(['POST'])
# These 2 decorators are for bypassing JWT token authentication for testing purposes
@authentication_classes([])
@permission_classes([])
def get_access_token(request):
    """
    # Must provides the user's email
    email = request.data.get('email')
    if email is None:
        return Response({'err': "Email not provided"}, status = status.HTTP_406_NOT_ACCEPTABLE)
    """
    email = "xtranx2@yahoo.com"
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
        start_date = '{:%Y-%m-%d}'.format(datetime.datetime.now() + datetime.timedelta(-180))
        end_date = '{:%Y-%m-%d}'.format(datetime.datetime.now())
        # For each accounts, create a new BankAccount object in database
        # Save the user's email, access token, and account_id for each object
        for account in response["accounts"]:

            # If official_name is not None then use it as bank account name
            # Otherwise use account['name']
            if account['official_name'] != None:
                print("Official Name: ", account['official_name'])
                new_account = BankAccounts.objects.create(
                    user=user[0],
                    access_token=access_token, account_id=account["account_id"],
                    type=account['subtype'],
                    name=account["official_name"],
                    balance=account['balances']['current'])
            else:
                print("Name: ", account['name'])
                new_account = BankAccounts.objects.create(
                    user=user[0],
                    access_token=access_token, account_id=account["account_id"],
                    type=account['subtype'],
                    name=account["name"],
                    balance=account['balances']['current'])

            # This part for adding a bill object if the account is a credit type
            if account['subtype'] == 'credit card' or account['subtype'] == 'credit'\
                    or account['type'] == 'credit card' or account['type'] == 'credit':
                Bill.objects.create(
                    account_id=new_account, amount=account['balances']['current'],
                    due_date=None, notified=False)

            # This part is for adding the transactions of each account from the last 180 days
            transactions = client.Transactions.get(access_token, start_date, end_date,
                                                   account_ids=[account["account_id"]])
            for transaction in transactions["transactions"]:
                d = transaction['date'].split("-")
                date = datetime.date(int(d[0]), int(d[1]), int(d[2]))
                # If the name of the transaction it > 255
                # slice it so that the length is 255 max
                amount = transaction["amount"]
                if account['subtype'] == 'credit card' or account['subtype'] == 'credit'\
                        or account['type'] == 'credit card' or account['type'] == 'credit':
                    if amount > 0:
                        amount = -amount
                    else:
                        amount = abs(amount)
                if len(transaction['name']) < 255:
                    Transactions.objects.create(
                        account_id=new_account, name=transaction['name'],
                        category=transaction['category'][0],
                        amount=amount, date=date, transaction_id=transaction['transaction_id'])
                else:
                    Transactions.objects.create(
                        account_id=new_account, name=transaction['name'][0: 254],
                        category=transaction['category'][0],
                        amount=amount, date=date, transaction_id=transaction['transaction_id'])
    except plaid.errors.PlaidError as err:
        return Response({"err": err.message}, status=status.HTTP_403_FORBIDDEN)

    # This is where I get the user's bank accounts and associated transactions to return

    return Response({'message': 'Success'})


@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
@authentication_classes([])
@permission_classes([])
# JSON Format is
# [[account.name, account.type, account.balance, [transaction.name, transaction.category
# # transaction.date, transaction.amount], ... more transactions]
def get_transactions_of_each_account(request):

    # email = request.data.get("email")
    # if email is None:
    #     return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    email = 'thn.trinity@gmail.com'
    user = User_Model.objects.filter(email=email)
    # If email is not found in database, error
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Query the accounts associated with the user
    accounts = BankAccounts.objects.filter(user=user[0])
    response = []
    # For each account, find the transactions associated with it
    for account in accounts:
        transactions = Transactions.objects.filter(account_id=account).order_by("date")
        if len(transactions) != 0:
            temp = []
            # Append the account name, type, balance to the list
            temp.append(account.name)
            temp.append(account.type)
            temp.append(str(account.balance))
            # For each transaction, add it to a dictionary where the key is
            # the transaction name and the value is a list containing
            # category, date, and amount
            print("-------------------")
            for transaction in transactions:
                print(transaction.date, "-", transaction.name)
                list = []
                list.append(transaction.name)
                list.append(transaction.category)
                list.append(str(transaction.date))
                list.append(transaction.amount)
                # Append dictionary to the list
                temp.append(list)
            # Append the list to the response json
            response.append(temp)
    for r in response:
        print(r)

    return Response({'transactions': response})


@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
@authentication_classes([])
@permission_classes([])
# JSON FORMAT IS
# [[transaction.name, transaction.category, transaction.date, transaction.amount],
#   ... more transactions]
def get_transactions(request):

    # email = request.data.get("email")
    # if email is None:
    #     return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    email = 'thn.trinity@gmail.com'
    user = User_Model.objects.filter(email=email)
    # If email is not found in database, error
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    accounts = BankAccounts.objects.filter(user=user[0])
    transactions = Transactions.objects.filter(account_id__in=list(accounts)).order_by("date")
    response = []
    for transaction in transactions:
        temp = []
        temp.append(transaction.name)
        temp.append(transaction.category)
        temp.append(str(transaction.date))
        temp.append(transaction.amount)
        response.append(temp)
    print(response)

    return Response({'transactions': response})


@csrf_exempt
@api_view(['GET'])
# The 2 decorators below is for bypassing JWT authentication for testing purposes
@authentication_classes([])
@permission_classes([])
def net_worth(request):

    # Provide user's email or fail
    # email = request.data.get("email")
    # if email is None:
    #     return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    email = 'thn.trinity@gmail.com'
    # If email is not found in database, fail
    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    # Query the accounts associated with the user
    accounts = BankAccounts.objects.filter(user=user[0])

    net_worth = 0

    # For each account, add the balance to the total if
    # the account is not credit card type
    for account in accounts:
        if account.type != 'credit card' or account.type != 'credit':
            net_worth += account.balance
        else:
            # If it is a credit card account, subtracts the balance
            net_worth -= account.balance

    return Response({"net worth": net_worth})


@csrf_exempt
@api_view(['GET'])
# The 2 decorators below are for bypassing JWT authentication for testing purposes
@authentication_classes([])
@permission_classes([])
# JSON Format is
# [{'category': category_name, total: total_amount},
#  {'category2': category2_name, total2: total2_amount}, ...]
def category_expenses(request):

    # Provide user's email or fail
    # email = request.data.get("email")
    # if email is None:
    #     return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    email = 'thn.trinity@gmail.com'
    # If email is not found in db, fail
    user = User_Model.objects.filter(email=email)

    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Query the accounts associated with the user
    accounts = BankAccounts.objects.filter(user=user[0])

    # SELECT B.category, Sum('amount')
    # FROM BankAccount A, Transaction B
    # WHERE A.account_id = B.account_id AND A.user = email
    # GROUPBY B.category
    transactions = Transactions.objects.filter(account_id__in=list(accounts)).\
        values('category').order_by('category').annotate(total=Sum('amount'))

    print(list(transactions))
    print(json.dumps(list(transactions)))

    return Response({'category_expense': list(transactions)})


@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
@authentication_classes([])
@permission_classes([])
# JSON FORMAT IS
# [{account.name: [bill.amount, bill.due_date, bill.notified]},
#  {account2.name: [bill2.amount, bill2.due_date, bill2.notified]},...]
def bills(request):
    """
    email = request.data.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status= status.HTTP_406_NOT_ACCEPTABLE)
    """
    email = 'thn.trinity@gmail.com'
    user = User_Model.objects.filter(email=email)
    # If email is not found in database, error
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    # Query for accounts associated with the user
    accounts = BankAccounts.objects.filter(user=user[0])
    response = []
    # For each account, query for associated bills
    for account in accounts:
        bill = Bill.objects.filter(account_id=account)

        # If the length of the queryset is 1, then a bill for that account is found
        if len(bill) == 1:
            # If bill due date is None, then return null for due date
            # else return the actual due date
            if bill[0].due_date != None:
                response.append(
                    {account.name: [bill[0].amount, str(bill[0].due_date), bill[0].notified]})
            else:
                response.append(
                    {account.name: [bill[0].amount, bill[0].due_date, bill[0].notified]})
    print(response)
    print(json.dumps(response))

    return Response({'bills': response})


@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
@authentication_classes([])
@permission_classes([])
def monthly_total_expenses(request):

    # email = request.data.get("email")
    # if email is None:
    #     return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    email = 'thn.trinity@gmail.com'
    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Query for the accounts associated with the user
    accounts = BankAccounts.objects.filter(user=user[0])

    date_range = []
    # Find the last 6 months and year
    # Store as a tuple (month, year) in list date_range
    for i in range(6):
        time = datetime.date.today() + relativedelta(months=-i)
        time = str(time).split("-")
        date_range.append((time[1], time[0]))
    print(date_range)

    total_expenses = 0
    response = []
    for month, year in date_range:
        # Find the transactions for each month, year
        transactions = Transactions.objects.filter(date__year=year, date__month=month,
                                                   account_id__in=list(accounts))
        # Calculate the total amount of these transactions
        for transaction in transactions:
            total_expenses += transaction.amount
            print(str(transaction.date) + ' ' + str(transaction.amount))

        print("Total Expenses: ", total_expenses)
        print("------------------------------")
        # Add the total expense of each month/year to response
        response.append([month + '-' + year, total_expenses])

    return Response({'monthly_expenses': response})
