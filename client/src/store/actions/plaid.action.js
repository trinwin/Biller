import {
  PLAID_LOGIN_SUCCESSFULLY,
  PLAID_LOGIN_FAILED,
  PLAID_GET_TRANSACTIONS_SUCCESS,
  PLAID_GET_TRANSACTIONS_FAILED,
  PLAID_GET_TRANSACTIONS_EACH_SUCCESS,
  PLAID_GET_TRANSACTIONS_EACH_FAILED,
  PLAID_GET_CATEGORY_SUCCESS,
  PLAID_GET_CATEGORY_FAILED,
  PLAID_GET_NET_WORTH_SUCCESS,
  PLAID_GET_NET_WORTH_FAILED,
  PLAID_GET_MONTHLY_EXPENSE_SUCCESS,
  PLAID_GET_MONTHLY_EXPENSE_FAILED,
  PLAID_GET_ALL_BILLS_SUCCESS,
  PLAID_GET_ALL_BILLS_FAILED,
} from '../../constants';

export const plaidLoginSuccessfully = user => ({
  type: PLAID_LOGIN_SUCCESSFULLY,
  payload: user,
});

export const plaidLoginFailed = error => ({
  type: PLAID_LOGIN_FAILED,
  payload: error,
});

export const plaidTransactionsSuccess = user => ({
  type: PLAID_GET_TRANSACTIONS_SUCCESS,
  payload: user,
});

export const plaidTransactionsFailed = error => ({
  type: PLAID_GET_TRANSACTIONS_FAILED,
  payload: error,
});
