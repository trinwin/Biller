/* eslint-disable import/prefer-default-export */
import {
  SET_USER_TOKEN,
  LOGIN_SUCCESSFULLY,
  LOGIN_FAILED,
  REGISTER_SUCCESSFULLY,
  REGISTER_FAILED,
  LOGOUT,
} from '../../constants';

export const loginSuccessfully = user => ({
  type: LOGIN_SUCCESSFULLY,
  payload: user,
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  payload: error,
});

export const registerSuccessfully = user => ({
  type: REGISTER_SUCCESSFULLY,
  payload: user,
});

export const registerFailed = error => ({
  type: REGISTER_FAILED,
  payload: error,
});

export const setUserToken = user => ({
  type: SET_USER_TOKEN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
