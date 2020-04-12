import axios from 'axios';
import {
  registerSuccessfully,
  registerFailed,
} from '../store/actions/auth.action';
import { HOST, REGISTER_URI, USER_EMAIL, USER_TOKEN } from '../constants';
import { setTokenToLocalStorage } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const register = userData => dispatch => {
  console.log('userData: ', userData);
  axios
    .post(`${HOST}${REGISTER_URI}`, userData)
    .then(res => {
      setTokenToLocalStorage(USER_EMAIL, res.data.email).then(() => {
        setTokenToLocalStorage(USER_TOKEN, res.data.token);
        dispatch(registerSuccessfully(res.data));
      });
    })
    .catch(err => {
      console.log('err: ', err.response.data);
      console.log(`error: ${err}`);
      dispatch(registerFailed(err));
    });
};
