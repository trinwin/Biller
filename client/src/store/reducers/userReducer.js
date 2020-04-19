import {
  SET_USER_INFO,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  UPDATE_PROFILE,
  LOGOUT,
} from '../../constants';

export default function(state = { loading: false, errors: null }, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // action.payload.has_profile = false;
      return { ...state, ...action.payload, ...{ loading: false } };
    case LOGIN_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case REGISTER_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } };
    case REGISTER_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case SET_USER_INFO:
      return { ...action.payload };
    case UPDATE_PROFILE:
      return { ...state, ...action.payload, ...{ loading: false } };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
