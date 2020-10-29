import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import dashboard from './dashboard';
import event from './event';
import cusOrder from './cusOrder';
import resOrder from './resOrder';
import restaurant from './restaurant';

export default combineReducers({
  alert,
  auth,
  profile,
  dashboard,
  event,
  cusOrder,
  resOrder,
  restaurant,
});
