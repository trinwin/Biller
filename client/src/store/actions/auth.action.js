/* eslint-disable import/prefer-default-export */
import {
  SET_USER_INFO,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  UPDATE_PROFILE,
  LOGOUT,
} from '../../constants';

export const loginSuccessfully = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  payload: error,
});

export const registerSuccessfully = user => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailed = error => ({
  type: REGISTER_FAILED,
  payload: error,
});

export const setUserInfo = user => ({
  type: SET_USER_INFO,
  payload: user,
});

export const updateProfile = user => ({
  type: UPDATE_PROFILE,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
