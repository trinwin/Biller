from django.test import TestCase
import django.core.exceptions as exceptions
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
import django.db as dbexceptions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from Authentication.models import User
from .models import BankAccounts, Transactions, Bill, Notification
from .helpers import calculate_daily_balances, calculate_days_between, calculate_total_balance
from django.db.models import Sum
import plaid
import random
import datetime
import json

# Create your tests here.


class JWTTestCases(APITestCase):
    def setUp(self):
        self.email = 'test@yahoo.com'
        self.password = 'password'
        self.user = User.objects.create(email = self.email, password= self.password)
        self.token = RefreshToken.for_user(self.user)
        self.access_token = self.token.access_token
        self.client = APIClient()
        self.client.login(email = self.email, password= self.password)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.token.access_token))

    def test_authenticate_access_token(self):
        response = self.client.post('/plaid/access-token/', {'email': self.email, 'public_token': 'test'})
        self.assertEqual(response.status_code, 406)
        response = self.client.get('/plaid/access-token/', {'email': self.email, 'public_token': 'test'})
        self.assertEqual(response.status_code, 405)

    def test_authenticate_transactions(self):
        response = self.client.post('/plaid/transactions/', {'email': self.email})
        self.assertEqual(response.status_code, 405)
        response = self.client.get('/plaid/transactions/', {'email': self.email})
        self.assertEqual(response.status_code, 200)
        
    def test_authenticate_transactions_of_each(self):
        response = self.client.post('/plaid/transactions-of-each-account/', {'email': self.email})
        self.assertEqual(response.status_code, 405)
        response = self.client.get('/plaid/transactions-of-each-account/', {'email': self.email})
        self.assertEqual(response.status_code, 200)

    def test_authenticate_categories(self):
        response = self.client.post('/plaid/categories/', {'email': self.email})
        self.assertEqual(response.status_code, 405)
        response = self.client.get('/plaid/categories/', {'email': self.email})
        self.assertEqual(response.status_code, 200)

    def test_authenticate_net_worth(self):
        response = self.client.post('/plaid/net-worth/', {'email': self.email})
        self.assertEqual(response.status_code, 405)
        response = self.client.get('/plaid/net-worth/', {'email': self.email})
        self.assertEqual(response.status_code, 200)

    def test_authenticate_monthly_total_expenses(self):
        response = self.client.post('/plaid/monthly-total-expenses/', {'email': self.email})
        self.assertEqual(response.status_code, 405)
        response = self.client.get('/plaid/monthly-total-expenses/', {'email': self.email})
        self.assertEqual(response.status_code, 200)

    def test_authenticate_monthly_total_income(self):
        response = self.client.post('/plaid/monthly-total-income/', {'email': self.email})
        self.assertEqual(response.status_code, 405)
        response = self.client.get('/plaid/monthly-total-income/', {'email': self.email})
        self.assertEqual(response.status_code, 200)

    def test_authentication_bills(self):
        response = self.client.post('/plaid/bills/', {'email': self.email})
        self.assertEqual(response.status_code, 405)
        response = self.client.get('/plaid/bills/', {'email': self.email})
        self.assertEqual(response.status_code, 200)

    def test_authenticate_change_due_date(self):
        response = self.client.get('/plaid/change-due-date/', {'email': self.email})
        self.assertEqual(response.status_code, 405)
        response = self.client.post('/plaid/change-due-date/', {'email': self.email})
        self.assertEqual(response.status_code, 404)

    def test_authenticate_graph_data(self):
        response = self.client.post('/plaid/graph-data/', {'email': self.email})
        self.assertEqual(response.status_code, 405)
        response = self.client.get('/plaid/graph-data/', {'email': self.email})
        self.assertEqual(response.status_code, 200)

    def test_authenticate_get_notifications(self):
        response = self.client.post('/plaid/get-notifications/', {'email': self.email})
        self.assertEqual(response.status_code, 405)
        response = self.client.get('/plaid/get-notifications/', {'email': self.email})
        self.assertEqual(response.status_code, 200)

    def test_authenticate_mark_notification_as_read(self):
        response = self.client.get('/plaid/mark_notification_as_read/', {'email': self.email})
        self.assertEqual(response.status_code, 405)

class AccountTestCases(APITestCase):

    def setUp(self):
        self.email = 'au.tran@sjsu.edu'
        self.password = 'password'
        self.user = User.objects.create(email = self.email, password= self.password)
        self.token = RefreshToken.for_user(self.user)
        self.access_token = self.token.access_token
        self.client = APIClient()
        self.client.login(email = self.email, password= self.password)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.token.access_token))
        self.accounts = {}
        self.accounts['checking'] = BankAccounts.objects.create(user=self.user, access_token='none', account_id = '1', type='checking'\
                                    ,name = 'Test Checking Account', balance = 1000)

        self.accounts['savings'] = BankAccounts.objects.create(user=self.user, access_token='none', account_id = '2', type='savings'\
                                    ,name = 'Test Savings Account', balance = 500)
        self.accounts['credit'] = BankAccounts.objects.create(user=self.user, access_token='none', account_id = '3', type='credit'\
                                    ,name = 'Test Credit Account', balance = 200)
        Bill.objects.create(account_id = self.accounts['credit'], amount = self.accounts['credit'].balance, \
                            due_date = None, notified = False)
        
        categories = ['Grocery', 'Shopping', 'Travel', 'Finance']
        i = 1
        for c in categories:
            for account in self.accounts:
                d = datetime.date(2020, random.randint(1,12), random.randint(1,28))
                Transactions.objects.create(category=c, name= c + " " + str(i), date = d, account_id = self.accounts[account],\
                                    amount = random.randrange(1,100), pending_status = False, \
                                    transaction_id = str(i))
                i += 1

    def test_calculate_total_balance(self):
        accounts = [self.accounts[account] for account in self.accounts]
        total_balance = calculate_total_balance(accounts)
        self.assertEqual(total_balance, 1700)

    def test_get_transactions(self):
        response = self.client.get('/plaid/transactions/', {'email': self.email})
        transactions = Transactions.objects.filter()
        response = json.loads(response.content)
        self.assertEqual(len(response['transactions']), len(transactions))
        for r in response['transactions']:
            if len(Transactions.objects.filter(name = r['name'])) == 0:
                self.fail("Transaction not found")

    
    def test_get_transactions_of_each_account(self):
        response = self.client.get('/plaid/transactions-of-each-account/', {'email': self.email})
        response = json.loads(response.content)
        
        for r in response['transactions_each']:
            acc = BankAccounts.objects.filter(name= r['name'].strip())
            if len(acc) == 0:
                self.fail("Account not found")

            self.assertEqual(len(r['transactions']), len(acc[0].transactions_set.all()))

            for transaction in r['transactions']:
                t = Transactions.objects.filter(name = transaction['name'])
                if len(t) == 0:
                    self.fail("Transaction not found")
    
    def test_categories(self):
        response = self.client.get('/plaid/categories/', {'email': self.email})
        response = json.loads(response.content)
        accounts = BankAccounts.objects.filter(user = self.user)

        categories = Transactions.objects.filter(account_id__in=list(accounts)).\
        values('category').order_by('category').annotate(total=Sum('amount'))
        categories = list(categories)

        self.assertEqual(len(response['category_expense']), len(categories))
        for r in response['category_expense']:
            transactions = Transactions.objects.filter(account_id__in = list(accounts), category= r['category'])
            if len(transactions) == 0:
                self.fail("Category not found")
            total_amount = r['total']

            sum = 0
            for t in transactions:
                sum += t.amount

            self.assertEqual(total_amount, sum)
    
    def test_net_worth(self):
        response = self.client.get('/plaid/net-worth/', {'email': self.email})
        response = json.loads(response.content)
        net_worth = 0
        for account in self.accounts:
            if self.accounts[account].type != 'credit' or self.accounts[account].type != 'credit card':
                net_worth += self.accounts[account].balance
            else:
                net_worth -= self.accounts[account].balance
        self.assertEqual(net_worth, response['net_worth'])

    def test_bills(self):
        response = self.client.get('/plaid/bills/', {'email': self.email})
        response = json.loads(response.content)['bills']

        accounts = BankAccounts.objects.filter(user = self.user)
        bills = Bill.objects.filter(account_id__in = list(accounts))

        self.assertEqual(len(response), len(bills))

    def test_change_due_date(self):
        date_string = datetime.datetime.today().strftime('%Y-%m-%d')
        for account in self.accounts:
            response = self.client.post('/plaid/change-due-date/', {'email': self.email, 'due_date': date_string\
                                                              ,'account_name': self.accounts[account].name})
            if self.accounts[account].type != 'credit':
                self.assertEqual(response.status_code, 404)
            else:
                response = json.loads(response.content)['response']
                bill = Bill.objects.filter(account_id = self.accounts[account])[0]
                self.assertEqual(str(bill.due_date), date_string)
                self.assertEqual(bill.notified, True)

