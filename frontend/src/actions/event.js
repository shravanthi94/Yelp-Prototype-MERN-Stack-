import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EVENT,
  GET_EVENTS,
  //   CREATE_EVENT,
  EVENT_ERROR,
  EVENT_REGISTER_SUCCESS,
  EVENT_REGISTER_ERROR,
  //   CUSTOMER_LIST_SUCCESS,
  //   LIST_ERROR,
  //   SUBMITTED_EVENTS,
  //   SUBMITTED_EVENTS_ERROR,
  REGISTERED_EVENTS,
  REGISTERED_EVENTS_ERROR,
} from './types';

//  Get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('/restaurant/event');
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get registered events
export const getRegisteredEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('/events/myevent/me');
    dispatch({
      type: REGISTERED_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTERED_EVENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Register for an event
export const registerEvent = (eventId, history) => async (dispatch) => {
  try {
    const res = await axios.post(`customer/event/${eventId}`);

    dispatch(setAlert('Successfully registered for the event', 'success'));

    dispatch({
      type: EVENT_REGISTER_SUCCESS,
      payload: res.data,
    });

    history.push('/event/registered');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: EVENT_REGISTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//   Get event by event name
export const getEventByName = (eventName) => async (dispatch) => {
  try {
    const res = await axios.get(`/restaurant/event/display/${eventName}`);
    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
