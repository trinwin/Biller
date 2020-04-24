import {
  PLAID_LOGIN_SUCCESS,
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
  PLAID_GET_MONTHLY_INCOME_SUCCESS,
  PLAID_GET_MONTHLY_INCOME_FAILED,
  PLAID_GET_ALL_BILLS_SUCCESS,
  PLAID_GET_ALL_BILLS_FAILED,
  PLAID_GET_GRAPH_DATA_SUCCESS,
  PLAID_GET_GRAPH_DATA_FAILED,
  PLAID_UPDATE_DUE_DATE_SUCCESS,
  PLAID_UPDATE_DUE_DATE_FAILED,
  PLAID_GET_NOTIFICATIONS_SUCCESS,
  PLAID_GET_NOTIFICATIONS_FAILED,
  PLAID_MARK_NOTIFICATION_READ_SUCCESS,
  PLAID_MARK_NOTIFICATION_READ_FAILED,
  LOGOUT,
} from '../../constants';

export default function(state = { loading: false, errors: null }, action) {
  switch (action.type) {
    case PLAID_LOGIN_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_LOGIN_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case PLAID_GET_TRANSACTIONS_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_GET_TRANSACTIONS_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case PLAID_GET_TRANSACTIONS_EACH_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_GET_TRANSACTIONS_EACH_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case PLAID_GET_CATEGORY_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_GET_CATEGORY_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case PLAID_GET_NET_WORTH_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_GET_NET_WORTH_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case PLAID_GET_MONTHLY_EXPENSE_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_GET_MONTHLY_EXPENSE_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case PLAID_GET_MONTHLY_INCOME_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_GET_MONTHLY_INCOME_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case PLAID_GET_ALL_BILLS_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_GET_ALL_BILLS_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case PLAID_GET_GRAPH_DATA_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_GET_GRAPH_DATA_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case PLAID_UPDATE_DUE_DATE_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_UPDATE_DUE_DATE_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case PLAID_GET_NOTIFICATIONS_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_GET_NOTIFICATIONS_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case PLAID_MARK_NOTIFICATION_READ_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case PLAID_MARK_NOTIFICATION_READ_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
