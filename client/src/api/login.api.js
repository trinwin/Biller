import axios from 'axios';
import { loginSuccessfully, loginFailed } from '../store/actions/auth.action';
import {
  HOST,
  LOGIN_URI,
  USER_EMAIL,
  USER_TOKEN,
  USER_FIRST_NAME,
  USER_LAST_NAME,
} from '../constants';

import { setTokenToLocalStorage } from '../utils';

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// eslint-disable-next-line import/prefer-default-export
export const login = userData => dispatch => {
  return axios
    .post(`${HOST}${LOGIN_URI}`, userData)
    .then(res => {
      const { token, email, first_name, last_name } = res.data;
      // Set user info to Local Storage
      setTokenToLocalStorage(USER_TOKEN, token).then(() => {
        localStorage.setItem(USER_EMAIL, email);
        localStorage.setItem(USER_FIRST_NAME, capitalize(first_name));
        localStorage.setItem(USER_LAST_NAME, capitalize(last_name));
        dispatch(loginSuccessfully(res.data));
      });
    })
    .catch(err => {
      dispatch(loginFailed(err));
    });
};
