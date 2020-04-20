from .models import Bill, Transactions, BankAccounts, Notification
from .email import send_email
from .__init__ import plaid_client
from dateutil.relativedelta import relativedelta
import datetime, threading

client = plaid_client()

def check_if_passed_due_date():
    today = '{:%Y-%m-%d}'.format(datetime.datetime.today())
    passed_due_bills = Bill.objects.filter(due_date__lt=today, notified=True)
    try:
        for bill in passed_due_bills:
            bill.notified = False
            bill.save()
    except Exception as e:
        print(e.body)
    threading.Timer(60, check_if_passed_due_date).start()


def check_due_date():
    today = '{:%Y-%m-%d}'.format(datetime.datetime.today())
    end_date = '{:%Y-%m-%d}'.format(datetime.datetime.now() + relativedelta(days=+7))
    due_bills = Bill.objects.filter(due_date__range=[today, end_date])
    try:
        for bill in due_bills:
            if bill.notified == False:
                account = bill.account_id
                send_email(account, bill)
                message = "Bill for " + account.name + " with amount $" + str(bill.amount) + \
                      " is due on " + str(bill.due_date)
                user = account.user
                Notification.objects.create(user=user, message=message)
    except Exception as e:
        print(e.body)
    threading.Timer(60, check_due_date).start()


def check_transactions_and_balance():
    start_date = '{:%Y-%m-%d}'.format(datetime.datetime.now() + datetime.timedelta(-1))
    end_date = '{:%Y-%m-%d}'.format(datetime.datetime.now())
    accounts = BankAccounts.objects.filter()
    try:
        for account in accounts:
            response = client.Accounts.get(account.access_token, account_ids=[account.account_id])
            if(response['accounts'][0]['balances']['current'] != account.balance):
                account.balance = response['accounts']['balances']['current']
                bill = Bill.objects.filter(account_id=account)
                bill.amount = account.balance
                bill.save()
                account.save()
            transactions = client.Transactions.get(account.access_token, start_date, end_date,
                                                   account_ids=[account.account_id])
            for transaction in transactions['transactions']:
                d = transaction['date'].split("-")
                date = datetime.date(int(d[0]), int(d[1]), int(d[2]))
                # If the name of the transaction it > 255
                # slice it so that the length is 255 max
                if len(Transactions.objects.filter(
                        transaction_id=transaction['transaction_id'])) == 0:
                    if len(transaction['name']) < 255:
                        Transactions.objects.create(
                            account_id=account, name=transaction['name'],
                            category=transaction['category'][0],
                            amount=transaction["amount"],
                            pending_status=transaction['pending'],
                            date=date, transaction_id=transaction['transaction_id'])
                    else:
                        Transactions.objects.create(
                            account_id=account, name=transaction['name'][0: 254],
                            category=transaction['category'][0],
                            amount=transaction["amount"],
                            pending_status=transaction['pending'],
                            date=date, transaction_id=transaction['transaction_id'])
    except Exception as e:
        print(e.body)
    threading.Timer(60, check_transactions_and_balance).start()