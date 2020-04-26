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
  plaidGetNotificationsSuccess,
  plaidGetNotificationFailed,
  plaidMarkNotificationReadSuccess,
  plaidMarkNotificationReadFailed,
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
  PLAID_MONTHLY_INCOME_URI,
  PLAID_CHANGE_BILL_DUE_DATE_URI,
  PLAID_GET_NOTIFICATIONS_URI,
  PLAID_MARK_NOTIFICATION_READ_URI,
} from '../constants';

// const token = localStorage.getItem(USER_TOKEN);
// const config = { headers: { Authorization: `Bearer ${token}` } };

// eslint-disable-next-line import/prefer-default-export
export const plaidLogin = userData => dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  axios
    .post(`${HOST}${PLAID_ACCESS_TOKEN_URI}`, userData, config)
    .then(res => {
      dispatch(plaidLoginSuccessfully(res.data));
    })
    .catch(err => {
      dispatch(plaidLoginFailed(err));
    });
};

export const plaidTransactions = userData => dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  axios
    .get(`${HOST}${PLAID_TRANSACTIONS_URI}?email=${userData.email}`, config)
    .then(res => {
      dispatch(plaidTransactionsSuccess(res.data));
    })
    .catch(err => {
      dispatch(plaidTransactionsFailed(err));
    });
};

export const plaidTransactionsEach = userData => dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  axios
    .get(
      `${HOST}${PLAID_TRANSACTIONS_EACH_URI}?email=${userData.email}`,
      config
    )
    .then(res => {
      dispatch(plaidTransactionsEachSuccess(res.data));
    })
    .catch(err => {
      dispatch(plaidTransactionsEachFailed(err));
    });
};

export const plaidCategories = userData => dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  axios
    .get(`${HOST}${PLAID_CATEGORIES_URI}?email=${userData.email}`, config)
    .then(res => {
      dispatch(plaidCategoriesSuccess(res.data));
    })
    .catch(err => {
      dispatch(plaidCategoriesFailed(err));
    });
};

export const plaidNetWorth = userData => dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  axios
    .get(`${HOST}${PLAID_NET_WORTH_URI}?email=${userData.email}`, config)
    .then(res => {
      dispatch(plaidNetWorthSuccess(res.data));
    })
    .catch(err => {
      dispatch(plaidNetWorthFailed(err));
    });
};

export const plaidMonthlyExpenses = userData => dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  axios
    .get(`${HOST}${PLAID_MONTHLY_EXPENSES_URI}?email=${userData.email}`, config)
    .then(res => {
      dispatch(plaidMonthlyExpensesSuccess(res.data));
    })
    .catch(err => {
      dispatch(plaidMonthlyExpensesFailed(err));
    });
};

export const plaidMonthlyIncome = userData => dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  axios
    .get(`${HOST}${PLAID_MONTHLY_INCOME_URI}?email=${userData.email}`, config)
    .then(res => {
      dispatch(plaidMonthlyIncomeSuccess(res.data));
    })
    .catch(err => {
      dispatch(plaidMonthlyIncomeFailed(err));
    });
};

export const plaidBills = userData => dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  axios
    .get(`${HOST}${PLAID_BILLS_URI}?email=${userData.email}`, config)
    .then(res => {
      dispatch(plaidBillsSuccess(res.data));
    })
    .catch(err => {
      dispatch(plaidBillsFailed(err));
    });
};

export const plaidGraphData = userData => dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  axios
    .get(`${HOST}${PLAID_GRAPH_DATA_URI}?email=${userData.email}`, config)
    .then(res => {
      dispatch(plaidGraphDataSuccess(res.data));
    })
    .catch(err => {
      dispatch(plaidGraphDataFailed(err));
    });
};

export const changeBillDueDate = userData => dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  console.log('userData sent to change due date: ', userData);
  return axios
    .post(`${HOST}${PLAID_CHANGE_BILL_DUE_DATE_URI}`, userData, config)
    .then(res => {
      console.log('res: ', res.data);
      dispatch(plaidBillUpdateSuccess(res.data));
    })
    .catch(err => {
      console.log('err: ', err.response);
      dispatch(plaidBillUpdateFailed(err));
    });
};

export const getNotification = userData => async dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  console.log('userData sent to getNotification: ', userData);
  try {
    const { data } = await axios.get(
      `${HOST}${PLAID_GET_NOTIFICATIONS_URI}?email=${userData.email}`,
      config
    );
    console.log('data: ', data);
    dispatch(plaidGetNotificationsSuccess(data));
  } catch (err) {
    console.log('err: ', err.response);
    dispatch(plaidGetNotificationFailed(err));
  }
};

export const markNotificationAsRead = userData => dispatch => {
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  console.log('userData sent to markNotificationAsRead: ', userData);
  axios
    .post(`${HOST}${PLAID_MARK_NOTIFICATION_READ_URI}`, userData, config)
    .then(res => {
      console.log('res: ', res.data);
      dispatch(plaidMarkNotificationReadSuccess(res.data));
    })
    .catch(err => {
      console.log('err: ', err.response);
      dispatch(plaidMarkNotificationReadFailed(err));
    });
};
