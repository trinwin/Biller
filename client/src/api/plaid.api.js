import axios from 'axios';
import {
  plaidLoginSuccessfully,
  plaidLoginFailed,
} from '../store/actions/plaid.action';
import {
  HOST,
  PLAID_PUlLIC_KEY,
  PLAID_PUlLIC_TOKEN,
  PLAID_ACCESS_TOKEN_URI,
  PLAID_TRANSACTIONS_URI,
  PLAID_TRANSACTIONS_EACH_URI,
  PLAID_CATEGOTIES_URI,
  PLAID_NET_WORTH_URI,
  PLAID_MONTHLY_EXPENSES_URI,
  PLAID_BILLS_URI,
} from '../constants';
import { setTokenToLocalStorage } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const plaidLogin = userData => dispatch => {
  console.log('userData sent to plaid login: ', userData);
  axios
    .post(`${HOST}${PLAID_ACCESS_TOKEN_URI}`, userData, PLAID_PUlLIC_KEY)
    .then(res => {
      console.log('res: ', res);
      // Set userToken to Local Storage
      dispatch(plaidLoginSuccessfully(res.data));
    })
    .catch(err => {
      console.log('err: ', err.response.data);
      dispatch(plaidLoginFailed(err));
    });
};

export const plaidTransactions = userData => dispatch => {
  console.log('userData sent to plaid login: ', userData);
  axios
    .get(`${HOST}${PLAID_TRANSACTIONS_URI}`, userData)
    .then(res => {
      console.log('res: ', res);
      // Set userToken to Local Storage
      dispatch(plaidLoginSuccessfully(res.data));
    })
    .catch(err => {
      console.log('err: ', err.response.data);
      dispatch(plaidLoginFailed(err));
    });
};
