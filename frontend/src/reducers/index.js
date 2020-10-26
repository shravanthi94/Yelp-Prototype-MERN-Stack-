import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import dashboard from './dashboard';

export default combineReducers({
  alert,
  auth,
  profile,
  dashboard,
});
