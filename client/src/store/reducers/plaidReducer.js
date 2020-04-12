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

export default function(state = { loading: false, errors: null }, action) {
  //   console.log(action.type);
  switch (action.type) {
    case PLAID_LOGIN_SUCCESSFULLY:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_LOGIN_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    default:
      return state;
  }
}
