import * as consts from '../constants.js';
import reducer from '../store/reducers/plaidReducer';

describe('plaid reducer actions', () => {
  let objectState;
  let action;
  beforeEach(() => {
    action = {
      payload: { str: 'Message good' },
      type: 'NOTSET',
    };

    objectState = {
      loading: false,
      errors: null,
    };
  });

  it('returns PLAID_GET_ALL_BILLS_FAILED', () => {
    action.type = consts.PLAID_GET_ALL_BILLS_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });
  it('returns PLAID_GET_ALL_BILLS_SUCCESS', () => {
    action.type = consts.PLAID_GET_ALL_BILLS_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns PLAID_GET_CATEGORY_FAILED', () => {
    action.type = consts.PLAID_GET_CATEGORY_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns PLAID_GET_CATEGORY_SUCCESS', () => {
    action.type = consts.PLAID_GET_CATEGORY_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns PLAID_GET_GRAPH_DATA_FAILED', () => {
    action.type = consts.PLAID_GET_GRAPH_DATA_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns PLAID_GET_GRAPH_DATA_SUCCESS', () => {
    action.type = consts.PLAID_GET_GRAPH_DATA_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns PLAID_GET_MONTHLY_EXPENSE_FAILED', () => {
    action.type = consts.PLAID_GET_MONTHLY_EXPENSE_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns PLAID_GET_MONTHLY_EXPENSE_SUCCESS', () => {
    action.type = consts.PLAID_GET_MONTHLY_EXPENSE_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns PLAID_GET_MONTHLY_INCOME_FAILED', () => {
    action.type = consts.PLAID_GET_MONTHLY_INCOME_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns PLAID_GET_MONTHLY_INCOME_SUCCESS', () => {
    action.type = consts.PLAID_GET_MONTHLY_INCOME_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns PLAID_GET_NET_WORTH_FAILED', () => {
    action.type = consts.PLAID_GET_NET_WORTH_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns PLAID_GET_NET_WORTH_SUCCESS', () => {
    action.type = consts.PLAID_GET_NET_WORTH_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns PLAID_GET_TRANSACTIONS_EACH_FAILED', () => {
    action.type = consts.PLAID_GET_TRANSACTIONS_EACH_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns PLAID_GET_TRANSACTIONS_EACH_SUCCESS', () => {
    action.type = consts.PLAID_GET_TRANSACTIONS_EACH_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns PLAID_GET_TRANSACTIONS_FAILED', () => {
    action.type = consts.PLAID_GET_TRANSACTIONS_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns PLAID_GET_TRANSACTIONS_SUCCESS', () => {
    action.type = consts.PLAID_GET_TRANSACTIONS_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns PLAID_LOGIN_FAILED', () => {
    action.type = consts.PLAID_LOGIN_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns PLAID_LOGIN_SUCCESS', () => {
    action.type = consts.PLAID_LOGIN_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns PLAID_UPDATE_DUE_DATE_FAILED', () => {
    action.type = consts.PLAID_UPDATE_DUE_DATE_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns PLAID_UPDATE_DUE_DATE_SUCCESS', () => {
    action.type = consts.PLAID_UPDATE_DUE_DATE_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns PLAID_MARK_NOTIFICATION_READ_FAILED', () => {
    action.type = consts.PLAID_MARK_NOTIFICATION_READ_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns PLAID_MARK_NOTIFICATION_READ_SUCCESS', () => {
    action.type = consts.PLAID_MARK_NOTIFICATION_READ_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns PLAID_GET_NOTIFICATIONS_FAILED', () => {
    action.type = consts.PLAID_GET_NOTIFICATIONS_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns PLAID_GET_NOTIFICATIONS_SUCCESS', () => {
    action.type = consts.PLAID_GET_NOTIFICATIONS_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns state when other cases fail', () => {
    expect(reducer(objectState, action)).toEqual( objectState );
  });
});
