import {
  SET_USER_TOKEN,
  LOGIN_SUCCESSFULLY,
  LOGIN_FAILED,
  REGISTER_SUCCESSFULLY,
  REGISTER_FAILED,
  LOGOUT,
} from '../../constants';

export default function(state = { loading: false, errors: null }, action) {
  console.log(action.type);
  switch (action.type) {
    case LOGIN_SUCCESSFULLY:
      const user = {
        email: action.payload.email,
        token: action.payload.token,
        has_profile: true,
      };
      return { ...state, ...user, ...{ loading: false } };
    case LOGIN_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case REGISTER_SUCCESSFULLY:
      return { ...state, ...action.payload, ...{ loading: false } };
    case REGISTER_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case SET_USER_TOKEN:
      return { ...action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
