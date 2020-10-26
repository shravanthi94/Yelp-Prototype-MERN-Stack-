import axios from 'axios';
import { setAlert } from './alert';
import { GET_DASHBOARD, DASHBOARD_ERROR } from './types';

//Get current users profile
export const getCurrentDashboard = () => async (dispatch) => {
  try {
    const res = await axios.get('/restaurant/profile');
    console.log(res.data);
    dispatch({
      type: GET_DASHBOARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
