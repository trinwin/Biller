import axios from 'axios';
import { loginSuccessfully, loginFailed } from '../store/actions/auth.action';
import { HOST, LOGIN_URI, USER_TOKEN } from '../constants';
import { setTokenToLocalStorage } from '../utils';
// import querystring from 'querystring';

// eslint-disable-next-line import/prefer-default-export
export const login = userData => dispatch => {
  console.log(HOST, LOGIN_URI, userData);
  axios
    .post(`${HOST}${LOGIN_URI}`, userData)
    .then(res => {
      // Set userToken to Local Storage
      setTokenToLocalStorage(USER_TOKEN, res.data.access_token).then(() => {
        console.log(res);
        dispatch(loginSuccessfully(res.data));
      });
    })
    .catch(err => {
      console.log(`error: ${err}`);
      dispatch(loginFailed(err));
    });
};
