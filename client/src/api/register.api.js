import axios from 'axios';
import { registerSuccessfully, registerFailed } from '../store/actions/auth.action';
import { HOST, REGISTER_URI } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const register = userData => dispatch => {
<<<<<<< HEAD
  console.log(userData);
=======
>>>>>>> 94a686cca077120d4d64bd1ca07a86072d6f4347
  axios
    .post(`${HOST}${REGISTER_URI}`, userData)
    .then(res => {
      dispatch(registerSuccessfully(res.data));
    })
    .catch(err => {
      console.log(`error: ${err}`);
      dispatch(registerFailed(err));
    });
};
