import * as consts from '../constants.js';
import reducer from '../store/reducers/userReducer';

describe('user reducer actions', () => {
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

  it('returns LOGIN_SUCCESS', () => {
    action.type = consts.LOGIN_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns LOGIN_FAILED', () => {
    action.type = consts.LOGIN_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns REGISTER_SUCCESS', () => {
    action.type = consts.REGISTER_SUCCESS;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns REGISTER_FAILED', () => {
    action.type = consts.REGISTER_FAILED;
    expect(reducer(objectState, action)).toEqual({
      loading: false,
      errors: { str: action.payload.str },
    });
  });

  it('returns UPDATE_PROFILE', () => {
    action.type = consts.UPDATE_PROFILE;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
      loading: false,
      errors: null,
    });
  });

  it('returns SET_USER_INFO', () => {
    action.type = consts.SET_USER_INFO;
    expect(reducer(objectState, action)).toEqual({
      str: action.payload.str,
    });
  });

  it('returns LOGOUT', () => {
    action.type = consts.LOGOUT;
    expect(reducer(objectState, action)).toEqual({});
  });

  it('returns state when other cases fail', () => {
    expect(reducer(objectState, action)).toEqual( objectState );
  });
});
