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

client = plaid_client()

# Add the initial Timer threads
threading.Timer(60, check_if_passed_due_date).start()
threading.Timer(60, check_due_date).start()
threading.Timer(60, check_transactions_and_balance).start()


@csrf_exempt
@api_view(['POST'])
# @authentication_classes([])
# @permission_classes([])
def get_access_token(request):
    email = request.data.get('email')
    if email is None:
        return Response({'err': "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    public_token = request.data.get('public_token')
    try:
        response = client.Item.public_token.exchange(public_token)
    except plaid.errors.PlaidError as err:
        return Response({"err": err.message}, status=status.HTTP_406_NOT_ACCEPTABLE)

    access_token = response['access_token']

    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "Email not found"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    try:
        response = client.Accounts.get(access_token)
        start_date = '{:%Y-%m-%d}'.format(datetime.datetime.now() + datetime.timedelta(-365))
        end_date = '{:%Y-%m-%d}'.format(datetime.datetime.now())

        for account in response["accounts"]:
            if account['official_name'] != None:
                if account['official_name'] == 'Bill':
                    new_account = BankAccounts.objects.create(
                        user=user[0],
                        access_token=access_token, account_id=account["account_id"],
                        type='utilities', name='PG&E', balance=account['balances']['current'])
                else:
                    name = ""
                    for word in account['official_name'].split(' '):
                        if word.isupper():
                            name += " " + word.lower().capitalize()
                        else:
                            name += " " + word
                    new_account = BankAccounts.objects.create(
                        user=user[0],
                        access_token=access_token, account_id=account["account_id"],
                        type=account['subtype'],
                        name=name,
                        balance=account['balances']['current'])
            else:
                name = ""
                for word in account['name'].split(' '):
                    if word.isupper():
                        name += " " + word.lower().capitalize()
                    else:
                        name += " " + word
                new_account = BankAccounts.objects.create(
                    user=user[0],
                    access_token=access_token, account_id=account["account_id"],
                    type=account['subtype'],
                    name=name,
                    balance=account['balances']['current'])

            # Add a bill object if the account is a credit type
            if account['subtype'] == 'credit card' or account['subtype'] == 'credit'\
                    or account['type'] == 'credit card' or account['type'] == 'credit'\
            or account['official_name'] == 'Bill':
                Bill.objects.create(
                    account_id=new_account, amount=account['balances']['current'],
                    due_date=None, notified=False)

            # Add the transactions of each account from the last 180 days
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

    return Response({'message': 'Success'})


@csrf_exempt
@api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
def get_transactions_of_each_account(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)

    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    accounts = BankAccounts.objects.filter(user=user[0])
    response = []
    for account in accounts:
        transactions = Transactions.objects.filter(account_id=account).order_by("date")
        temp = {}
        temp['name'] = ""
        for word in account.name.split(' '):
            if word.isupper():
                temp['name'] += " " + word.lower().capitalize()
            else:
                temp['name'] += " " + word
        temp['type'] = account.type
        temp['balance'] = str(account.balance)
        if len(transactions) >= 0:
            t = []
            for transaction in transactions:
                list = {}
                list['name'] = transaction.name
                list['category'] = transaction.category
                list['date'] = str(transaction.date)
                list['amount'] = transaction.amount
                list['pending'] = transaction.pending_status
                t.append(list)
            temp['transactions'] = reversed(t)

        response.append(temp)
    for r in response:
        print(r)

    return Response({'transactions_each': response})


@csrf_exempt
@api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
def get_transactions(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)

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
# @authentication_classes([])
# @permission_classes([])
def net_worth(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

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
# @authentication_classes([])
# @permission_classes([])
def category_expenses(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)

    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    accounts = BankAccounts.objects.filter(user=user[0])

    transactions = Transactions.objects.filter(account_id__in=list(accounts)).\
        values('category').order_by('category').annotate(total=Sum('amount'))

    return Response({'category_expense': list(transactions)})


@csrf_exempt
@api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
def bills(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    accounts = BankAccounts.objects.filter(user=user[0])
    response = []
    for account in accounts:
        bill = Bill.objects.filter(account_id=account)

        if len(bill) == 1:
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

    return Response({'bills': response})


@csrf_exempt
@api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
def monthly_total_expenses(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    accounts = BankAccounts.objects.filter(user=user[0])

    date_range = []
    # Find the last 12 months and year
    for i in range(12):
        time = datetime.date.today() + relativedelta(months=-i)
        time = str(time).split("-")
        date_range.append((time[1], time[0]))

    total_expenses = 0
    response = []
    for month, year in date_range:
        transactions = Transactions.objects.filter(
            date__year=year, date__month=month, amount__gt=0, account_id__in=list(accounts))
        total_expenses = 0
        for transaction in transactions:
            total_expenses += transaction.amount

        response.append([month + '-' + year[2:], total_expenses])

    return Response({'monthly_expenses': reversed(response)})


@csrf_exempt
@api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
def graph_data(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    accounts = BankAccounts.objects.filter(user=user[0])
    total_balance = 0

    for account in accounts:
        total_balance += account.balance
    date_range = []

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
                total_daily_expense += transaction.amount
        total_balance += total_daily_expense
        data.append(total_balance)
    data.reverse()
    return Response({'graph_data': data})


def calculate_days_between(day_one: str, day_two: str):
    day_one = datetime.datetime.strptime(day_one, "%Y-%m-%d")
    day_two = datetime.datetime.strptime(day_two, "%Y-%m-%d")
    return (day_one - day_two).days


@csrf_exempt
@api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
def monthly_total_income(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    accounts = BankAccounts.objects.filter(user=user[0])

    date_range = []
    # Find the last 12 months and year
    for i in range(12):
        time = datetime.date.today() + relativedelta(months=-i)
        time = str(time).split("-")
        date_range.append((time[1], time[0]))

    total_expenses = 0
    response = []
    for month, year in date_range:
        transactions = Transactions.objects.filter(
            date__year=year, date__month=month, amount__lt=0, account_id__in=list(accounts))

        total_expenses = 0
        for transaction in transactions:
            total_expenses += transaction.amount

        total_expenses = total_expenses * (-1)
        response.append([month + '-' + year, total_expenses])

    return Response({'monthly_income': reversed(response)})


@csrf_exempt
@api_view(['POST'])
# @authentication_classes([])
# @permission_classes([])
def change_due_date(request):

    email = request.data.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

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
    if days_between <= 7 and days_between >= -1:
        send_email(account[0], bill)
        message = "Bill for " + account[0].name + " with amount $" + str(bill.amount) + \
            " is due on " + str(bill.due_date)
        Notification.objects.create(user=user[0], message=message)

    return Response(
        {"response": {account[0].name: [bill.amount, str(bill.due_date),
                                        bill.notified]}})


@csrf_exempt
@api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
def graph_data(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
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
# @authentication_classes([])
# @permission_classes([])
def get_notifications(request):

    email = request.GET.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    responses = Notification.objects.filter(user=user[0], unread=True)
    notifications = []
    for response in responses:
        notification = {'notification_id': response.id, 'message': response.message}
        notifications.append(notification)
    return Response({'notifications': notifications})


@csrf_exempt
@api_view(['POST'])
# @authentication_classes([])
# @permission_classes([])
def mark_notification_as_read(request):
    email = request.data.get("email")
    if email is None:
        return Response({"err": "Email not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    user = User_Model.objects.filter(email=email)
    if user is None or len(user) == 0:
        return Response({"err": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    notification_id = request.data.get('notifcation_id')
    notification = Notification.objects.filter(user=user[0], primary_key=notification_id)
    notification.unread = False
    notification.save()
    return Response({'notification_marked': {'notification_id': notification_id, 'unread': notification.unread}})
