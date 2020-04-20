import os 
import plaid 


def plaid_client():
    PLAID_CLIENT_ID = ""
    PLAID_SECRET = ""
    PLAID_PUBLIC_KEY = ""

    with open("Plaid_API_Keys", 'r') as Plaid_File:
        PLAID_CLIENT_ID = Plaid_File.readline().strip()
        PLAID_SECRET = Plaid_File.readline().strip()
        PLAID_PUBLIC_KEY = Plaid_File.readline().strip()


    # PLAID_ENV = os.getenv('PLAID_ENV', 'sandbox')
    PLAID_ENV = os.getenv('PLAID_ENV', 'development')
    PLAID_PRODUCTS = os.getenv('PLAID_PRODUCTS', 'transactions')
    PLAID_COUNTRY_CODES = os.getenv('PLAID_COUNTRY_CODES', 'US,CA,GB,FR,ES')
    PLAID_OAUTH_REDIRECT_URL = os.getenv('PLAID_OAUTH_REDIRECT_URL', '')
    PLAID_OAUTH_NONCE = os.getenv('PLAID_OAUTH_NONCE', '')

    return plaid.Client(client_id=PLAID_CLIENT_ID, secret=PLAID_SECRET, public_key=PLAID_PUBLIC_KEY,\
                        environment=PLAID_ENV, api_version='2019-05-29')