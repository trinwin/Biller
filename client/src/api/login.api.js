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
  console.log('userData sent to login: ', userData);
  axios
    .post(`${HOST}${LOGIN_URI}`, userData)
    .then(res => {
      console.log('res: ', res);
      // Set user info to Local Storage
      setTokenToLocalStorage(USER_TOKEN, res.data.token).then(() => {
        localStorage.setItem(USER_EMAIL, res.data.email);
        localStorage.setItem(USER_FIRST_NAME, capitalize(res.data.first_name));
        localStorage.setItem(USER_LAST_NAME, capitalize(res.data.last_name));
        dispatch(loginSuccessfully(res.data));
      });
    })
    .catch(err => {
      console.log('err: ', err.response.data);
      dispatch(loginFailed(err));
    });
};
