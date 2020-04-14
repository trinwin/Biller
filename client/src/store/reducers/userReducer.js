import {
  SET_USER_INFO,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT,
} from '../../constants';

export default function(state = { loading: false, errors: null }, action) {
  console.log(action.type);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case LOGIN_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case REGISTER_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case REGISTER_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case SET_USER_INFO:
      return { ...action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
