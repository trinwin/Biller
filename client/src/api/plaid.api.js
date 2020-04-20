import axios from 'axios';
import {
  plaidLoginSuccessfully,
  plaidLoginFailed,
  plaidTransactionsSuccess,
  plaidTransactionsFailed,
  plaidTransactionsEachSuccess,
  plaidTransactionsEachFailed,
  plaidCategoriesSuccess,
  plaidCategoriesFailed,
  plaidNetWorthSuccess,
  plaidNetWorthFailed,
  plaidMonthlyExpensesSuccess,
  plaidMonthlyExpensesFailed,
  plaidMonthlyIncomeSuccess,
  plaidMonthlyIncomeFailed,
  plaidBillsSuccess,
  plaidBillsFailed,
  plaidBillUpdateFailed,
  plaidBillUpdateSuccess,
  plaidGraphDataSuccess,
  plaidGraphDataFailed,
} from '../store/actions/plaid.action';
import {
  HOST,
  PLAID_ACCESS_TOKEN_URI,
  PLAID_TRANSACTIONS_URI,
  PLAID_TRANSACTIONS_EACH_URI,
  PLAID_CATEGORIES_URI,
  PLAID_NET_WORTH_URI,
  PLAID_MONTHLY_EXPENSES_URI,
  PLAID_BILLS_URI,
  PLAID_GRAPH_DATA_URI,
  USER_TOKEN,
  PLAID_MONTHLY_INCOME_URI,
  PLAID_BILLS_DATE_UPDATE,
} from '../constants';

const token = localStorage.getItem(USER_TOKEN);
const config = { headers: { Authorization: `Bearer ${token}` } };

// eslint-disable-next-line import/prefer-default-export
export const plaidLogin = userData => dispatch => {
  axios
    .post(`${HOST}${PLAID_ACCESS_TOKEN_URI}`, userData, config)
    .then(res => {
      //   console.log('res: ', res);
      dispatch(plaidLoginSuccessfully(res.data));
    })
    .catch(err => {
      console.log('err: ', err.response);
      dispatch(plaidLoginFailed(err));
    });
};

export const plaidTransactions = userData => dispatch => {
  axios
    .get(`${HOST}${PLAID_TRANSACTIONS_URI}?email=${userData.email}`, config)
    .then(res => {
      //   console.log('res: ', res.data);
      dispatch(plaidTransactionsSuccess(res.data));
    })
    .catch(err => {
      console.log('[plaidTransactions] err: ', err.response);
      dispatch(plaidTransactionsFailed(err));
    });
};

export const plaidTransactionsEach = userData => dispatch => {
  axios
    .get(
      `${HOST}${PLAID_TRANSACTIONS_EACH_URI}?email=${userData.email}`,
      config
    )
    .then(res => {
      //   console.log('res: ', res.data);
      dispatch(plaidTransactionsEachSuccess(res.data));
    })
    .catch(err => {
      console.log('[plaidTransactionsEach] err: ', err.response);
      dispatch(plaidTransactionsEachFailed(err));
    });
};

export const plaidCategories = userData => dispatch => {
  axios
    .get(`${HOST}${PLAID_CATEGORIES_URI}?email=${userData.email}`, config)
    .then(res => {
      // console.log('res: ', res.data);
      dispatch(plaidCategoriesSuccess(res.data));
    })
    .catch(err => {
      console.log('[plaidCategories] err: ', err.response);
      dispatch(plaidCategoriesFailed(err));
    });
};

export const plaidNetWorth = userData => dispatch => {
  axios
    .get(`${HOST}${PLAID_NET_WORTH_URI}?email=${userData.email}`, config)
    .then(res => {
      //   console.log('res: ', res.data);
      dispatch(plaidNetWorthSuccess(res.data));
    })
    .catch(err => {
      console.log('[plaidNetWorth] err: ', err.response);
      dispatch(plaidNetWorthFailed(err));
    });
};

export const plaidMonthlyExpenses = userData => dispatch => {
  axios
    .get(`${HOST}${PLAID_MONTHLY_EXPENSES_URI}?email=${userData.email}`, config)
    .then(res => {
      //   console.log('res: ', res.data);
      dispatch(plaidMonthlyExpensesSuccess(res.data));
    })
    .catch(err => {
      console.log('[plaidMonthlyExpense] err: ', err.response);
      dispatch(plaidMonthlyExpensesFailed(err));
    });
};

export const plaidMonthlyIncome = userData => dispatch => {
  axios
    .get(`${HOST}${PLAID_MONTHLY_INCOME_URI}?email=${userData.email}`, config)
    .then(res => {
      //   console.log('res: ', res.data);
      dispatch(plaidMonthlyIncomeSuccess(res.data));
    })
    .catch(err => {
      console.log('[plaidMonthlyExpense] err: ', err.response);
      dispatch(plaidMonthlyIncomeFailed(err));
    });
};

export const plaidBills = userData => dispatch => {
  axios
    .get(`${HOST}${PLAID_BILLS_URI}?email=${userData.email}`, config)
    .then(res => {
      //   console.log('res: ', res.data);
      dispatch(plaidBillsSuccess(res.data));
    })
    .catch(err => {
      console.log('[plaidBill] err: ', err.response);
      dispatch(plaidBillsFailed(err));
    });
};

export const plaidGraphData = userData => dispatch => {
  axios
    .get(`${HOST}${PLAID_GRAPH_DATA_URI}?email=${userData.email}`, config)
    .then(res => {
      // console.log('res: ', res.data);
      dispatch(plaidGraphDataSuccess(res.data));
    })
    .catch(err => {
      console.log('err: ', err.response);
      dispatch(plaidGraphDataFailed(err));
    });
};

export const changeDueDate = userData => dispatch => {
  console.log('userData sent to change date: ', userData);
  axios
    .post(`${HOST}${PLAID_BILLS_DATE_UPDATE}`, userData, config)
    .then(res => {
      console.log('res: ', res.data);
      dispatch(plaidBillUpdateSuccess(res.data));
    })
    .catch(err => {
      console.log('err: ', err.response);
      dispatch(plaidBillUpdateFailed(err));
    });
};
