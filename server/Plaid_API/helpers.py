from .models import Transactions
import datetime

def calculate_total_balance(accounts):
    total_balance = 0
    for account in accounts:
        total_balance += account.balance
    return total_balance


def calculate_daily_balances(total_balance: float, date_range, accounts):
    data = []
    data.append(total_balance)
    for month, year, day in date_range:
        transactions = Transactions.objects.filter(date__year=year, date__month=month,
                                                   date__day=day, account_id__in=accounts)
        total_daily_expense = 0
        for transaction in transactions:
            if(transaction.pending_status == False):
                total_daily_expense += transaction.amount
        total_balance += total_daily_expense
        data.append(total_balance)
    data.reverse()
    return data

def calculate_days_between(day_one: str, day_two: str):
    day_one = datetime.datetime.strptime(day_one, "%Y-%m-%d")
    day_two = datetime.datetime.strptime(day_two, "%Y-%m-%d")
    return (day_one - day_two).days