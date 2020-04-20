from django.shortcuts import render
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from .models import BankAccounts, Transactions, Bill, Notification
from Authentication.models import User as User_Model
from django.db.models import Sum
from dateutil.relativedelta import relativedelta
from itertools import chain
from .__init__ import plaid_client
from .email import send_email 
from .threads import check_if_passed_due_date, check_due_date, check_transactions_and_balance 
from .helpers import calculate_daily_balances, calculate_days_between, calculate_total_balance
import time
import datetime
import json
import time
import threading
# Create your views here.

client = plaid_client()

# Add the initial Timer threads
threading.Timer(60, check_if_passed_due_date).start()
threading.Timer(60, check_due_date).start()
threading.Timer(60, check_transactions_and_balance).start()

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

    public_token = request.data.get('public_token')
    # Exchanges the public token for an access token
    # Create a "link" to the user's bank account

    try:
        response = client.Item.public_token.exchange(public_token)
    except plaid.errors.PlaidError as err:
        return Response({"err": err.message}, status=status.HTTP_406_NOT_ACCEPTABLE)
    # Get the access token and query for the user object with the user's email
    access_token = response['access_token']
    print(access_token)

    user = User_Model.objects.filter(email=email)
    # If email is not found in database, error
    if user is None or len(user) == 0:
        return Response({"err": "Email not found"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    try:
        # Using the access token, retrieve the user's financial accounts
        response = client.Accounts.get(access_token)
        start_date = '{:%Y-%m-%d}'.format(datetime.datetime.now() + datetime.timedelta(-365))
        end_date = '{:%Y-%m-%d}'.format(datetime.datetime.now())
        # For each accounts, create a new BankAccount object in database
        # Save the user's email, access token, and account_id for each object
        for account in response["accounts"]:

            # If official_name is not None then use it as bank account name
            # Otherwise use account['name']
            if account['official_name'] != None:
                print("Official Name: ", account['official_name'])
                if account['official_name'] == 'Bill':
                    new_account = BankAccounts.objects.create(
                        user=user[0],
                        access_token=access_token, account_id=account["account_id"],
                        type='utilities', name='PG&E', balance=account['balances']['current'])
                else:
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
                    or account['type'] == 'credit card' or account['type'] == 'credit'\
                or account['official_name'] == 'Bill':
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
                if len(Transactions.objects.filter(
                        transaction_id=transaction['transaction_id'])) == 0:
                    if len(transaction['name']) < 255:
                        Transactions.objects.create(
                            account_id=new_account, name=transaction['name'],
                            category=transaction['category'][0],
                            amount=transaction["amount"],
                            pending_status=transaction['pending'],
                            date=date, transaction_id=transaction['transaction_id'])
                    else:
                        Transactions.objects.create(
                            account_id=new_account, name=transaction['name'][0: 254],
                            category=transaction['category'][0],
                            amount=transaction["amount"],
                            pending_status=transaction['pending'],
                            date=date, transaction_id=transaction['transaction_id'])
    except plaid.errors.PlaidError as err:
        return Response({"err": err.message}, status=status.HTTP_403_FORBIDDEN)

    # This is where I get the user's bank accounts and associated transactions to return

    return Response({'message': 'Success'})


@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
# @authentication_classes([])
# @permission_classes([])
# JSON Format is
# [[account.name, account.type, account.balance, [transaction.name, transaction.category
# # transaction.date, transaction.amount, transaction.pending_status], ... more transactions]
def get_transactions_of_each_account(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

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
        temp = {}
        # Append the account name, type, balance to the list
        temp['name'] = account.name
        temp['type'] = account.type
        temp['balance'] = str(account.balance)
        if len(transactions) != 0:
            # For each transaction, add it to a dictionary where the key is
            # the transaction name and the value is a list containing
            # category, date, and amount
            print("-------------------")
            t = []
            for transaction in transactions:
                print(transaction.date, "-", transaction.name)
                list = {}
                list['name'] = transaction.name
                list['category'] = transaction.category
                list['date'] = str(transaction.date)
                list['amount'] = transaction.amount
                list['pending'] = transaction.pending_status
                # Append dictionary to the list
                t.append(list)
            temp['transactions'] = t
        # Append the list to the response json
        response.append(temp)
    for r in response:
        print(r)

    return Response({'transactions_each': response})


@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
# @authentication_classes([])
# @permission_classes([])
# JSON FORMAT IS
# [[transaction.name, transaction.category, transaction.date, transaction.amount, transaction.pending_status],
#   ... more transactions]
def get_transactions(request):

    email = request.GET.get("email")
    print(email)
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    # If email is not found in database, error
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    accounts = BankAccounts.objects.filter(user=user[0])
    transactions = Transactions.objects.filter(account_id__in=list(accounts)).order_by("date")
    response = []
    for transaction in transactions:
        temp = {}
        temp["name"] = transaction.name
        temp['category'] = transaction.category
        temp['date'] = str(transaction.date)
        temp['amount'] = transaction.amount
        temp['pending'] = transaction.pending_status
        response.append(temp)

    return Response({'transactions': reversed(response)})


@csrf_exempt
@api_view(['GET'])
# The 2 decorators below is for bypassing JWT authentication for testing purposes
# @authentication_classes([])
# @permission_classes([])
def net_worth(request):

    # Provide user's email or fail
    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    # email = 'thn.trinity@gmail.com'
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

    return Response({"net_worth": net_worth})


@csrf_exempt
@api_view(['GET'])
# The 2 decorators below are for bypassing JWT authentication for testing purposes
# @authentication_classes([])
# @permission_classes([])
# JSON Format is
# [{'category': category_name, total: total_amount},
#  {'category2': category2_name, total2: total2_amount}, ...]
def category_expenses(request):
    # Provide user's email or fail
    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

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

    return Response({'category_expense': list(transactions)})


@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
# @authentication_classes([])
# @permission_classes([])
# JSON FORMAT IS
# [{account.name: [bill.amount, bill.due_date, bill.notified]},
#  {account2.name: [bill2.amount, bill2.due_date, bill2.notified]},...]
def bills(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

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
            dict = {}
            dict['name'] = account.name
            dict['amount'] = bill[0].amount
            dict['notified'] = bill[0].notified
            if bill[0].due_date != None:
                dict['due_date'] = str(bill[0].due_date)
                response.append(dict)
            else:
                dict['due_date'] = bill[0].due_date
                response.append(dict)
    print(response)

    return Response({'bills': response})


@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
# @authentication_classes([])
# @permission_classes([])
def monthly_total_expenses(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Query for the accounts associated with the user
    accounts = BankAccounts.objects.filter(user=user[0])

    date_range = []
    # Find the last 6 months and year
    # Store as a tuple (month, year) in list date_range
    for i in range(12):
        time = datetime.date.today() + relativedelta(months=-i)
        time = str(time).split("-")
        date_range.append((time[1], time[0]))

    total_expenses = 0
    response = []
    for month, year in date_range:
        # Find the transactions for each month, year
        transactions = Transactions.objects.filter(
            date__year=year, date__month=month, amount__gt=0, account_id__in=list(accounts))
        total_expenses = 0
        # Calculate the total amount of these transactions
        for transaction in transactions:
            total_expenses += transaction.amount

        print("Total Expenses: ", total_expenses)
        print("------------------------------")
        # Add the total expense of each month/year to response
        response.append([month + '-' + year[2:], total_expenses])

    return Response({'monthly_expenses': reversed(response)})


@csrf_exempt
@api_view(['POST'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
# @authentication_classes([])
# @permission_classes([])
def graph_data(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    # If email is not found in database, error
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    account_type = request.GET.get("account_type")
    if account_type is None:
        return Response({"err": "Account type not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)
    elif account_type != 'savings' and account_type != 'checking':
        return Response({"err": "Incorrect account type"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    accounts = BankAccounts.objects.filter(user=user[0], type=account_type)
    total_balance = 0

    for account in accounts:
        total_balance += account.balance
    date_range = []

    print(total_balance)
    for i in range(90):
        time = datetime.date.today() + relativedelta(days=-i)
        time = str(time).split("-")
        date_range.append((time[1], time[0], time[2]))
    data = []
    data.append(total_balance)
    for month, year, day in date_range:
        transactions = Transactions.objects.filter(date__year=year, date__month=month,
                                                   date__day=day, account_id__in=list(accounts))
        total_daily_expense = 0
        for transaction in transactions:
            if(transaction.pending_status == False):
                print(transaction.amount, " ", transaction.date, " ", transaction.name)
                total_daily_expense += transaction.amount
        total_balance += total_daily_expense
        data.append(total_balance)
    data.reverse()
    return Response({account_type+'graph': data})


def calculate_days_between(day_one: str, day_two: str):
    day_one = datetime.datetime.strptime(day_one, "%Y-%m-%d")
    day_two = datetime.datetime.strptime(day_two, "%Y-%m-%d")
    return (day_one - day_two).days

    return Response({'monthly_expenses': reversed(response)})


@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
# @authentication_classes([])
# @permission_classes([])
def monthly_total_income(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Query for the accounts associated with the user
    accounts = BankAccounts.objects.filter(user=user[0])

    date_range = []
    # Find the last 6 months and year
    # Store as a tuple (month, year) in list date_range
    for i in range(11):
        time = datetime.date.today() + relativedelta(months=-i)
        time = str(time).split("-")
        date_range.append((time[1], time[0]))

    total_expenses = 0
    response = []
    for month, year in date_range:
        # Find the transactions for each month, year
        transactions = Transactions.objects.filter(
            date__year=year, date__month=month, amount__lt=0, account_id__in=list(accounts))
        total_expenses = 0
        # Calculate the total amount of these transactions
        for transaction in transactions:
            total_expenses += transaction.amount
        total_expenses = total_expenses * (-1)
        print("Total Expenses: ", total_expenses)
        print("------------------------------")
        # Add the total expense of each month/year to response
        response.append([month + '-' + year, total_expenses])

    return Response({'monthly_income': reversed(response)})


@csrf_exempt
@api_view(['POST'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
@authentication_classes([])
@permission_classes([])
def change_due_date(request):

    email = request.data.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    # If email is not found in database, error
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Date format YYYY-MM-DD

    due_date = request.data.get("due_date")
    if due_date is None:
        return Response({"err": "Due date not provided"}, status=status.HTTP_404_NOT_FOUND)

    account_name = request.data.get("account_name")
    if account_name is None:
        return Response({"err": "Account name ot provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    account = BankAccounts.objects.filter(name=account_name)
    if len(account) == 0:
        return Response({"err": "Account not found"}, status=status.HTTP_404_NOT_FOUND)

    bill = Bill.objects.filter(account_id=account[0])
    if len(bill) == 0:
        return Response({"err": "Bill not found"}, status=status.HTTP_404_NOT_FOUND)

    bill = bill[0]
    due_date = due_date.split("-")
    date = datetime.date(int(due_date[0]), int(due_date[1]), int(due_date[2]))
    bill.due_date = date
    bill.save()

    today = datetime.datetime.today().strftime('%Y-%m-%d')
    days_between = calculate_days_between("-".join(due_date), str(today))
    print(days_between)
    if days_between <= 7 and days_between >= -1:
        if bill.notified == False:
            send_email(account[0], bill)
            message = "Bill for " + account[0].name + " with amount $" + str(bill.amount) + \
                      " is due on " + str(bill.due_date) 
            Notification.objects.create(user=user[0], message=message)
        else:
            pass

    return Response(
        {"response": {account[0].name: [bill.amount, str(bill.due_date),
                                        bill.notified]}})


@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
# @authentication_classes([])
# @permission_classes([])
def graph_data(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    # If email is not found in database, error
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    date_range = []
    for i in range(90):
        time = datetime.date.today() + relativedelta(days=-i)
        time = str(time).split("-")
        date_range.append((time[1], time[0], time[2]))

    accounts = BankAccounts.objects.filter(user=user[0], type="checking")
    checking_balances = calculate_total_balance(accounts)
    checking_data = calculate_daily_balances(checking_balances, date_range, list(accounts))

    accounts = BankAccounts.objects.filter(user=user[0], type="savings")
    saving_balances = calculate_total_balance(accounts)
    savings_data = calculate_daily_balances(saving_balances, date_range, list(accounts))

    accounts = BankAccounts.objects.filter(user=user[0], type="credit card")
    credit_balances = calculate_total_balance(accounts)
    accounts = list(chain(accounts, BankAccounts.objects.filter(user=user[0], type='credit')))
    credit_data = calculate_daily_balances(credit_balances, date_range, accounts)
    response = [{'type': 'checking', 'data': checking_data}, {'type': 'savings', 'data': savings_data},
                {'type': 'credit card', 'data': [abs(balance) for balance in credit_data]}]
    return Response({'graph_data': response})

@csrf_exempt
@api_view(['GET'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
# @authentication_classes([])
# @permission_classes([])
def get_notifications(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    # If email is not found in database, error
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    responses  = Notification.objects.filter(user=user[0], unread=True)
    notifications = []
    for response in responses:
        notification = {'notification_id': response.id, 'message': response.message}
        notifications.append(notification)
    return Response({'notifications': notifications})

@csrf_exempt
@api_view(['POST'])
# These 2 decorators are for bypassing JWT tokens for testing purposes
# @authentication_classes([])
# @permission_classes([])
def mark_notification_as_read(request):
    email = request.data.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    # If email is not found in database, error
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    notification_id = request.data.get('notifcation_id')
    notification = Notification.objects.filter(user=user[0], primary_key = notification_id)
    notification.unread = False 
    notification.save()
    return Response({'notification_marked': {'notification_id': notification_id, 'unread': notification.unread}})
