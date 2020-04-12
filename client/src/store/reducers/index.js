import { combineReducers } from 'redux';
import userReducer from './userReducer';
import plaidReducer from './plaidReducer';

export default combineReducers({
  user: userReducer,
  plaids: plaidReducer,
});
