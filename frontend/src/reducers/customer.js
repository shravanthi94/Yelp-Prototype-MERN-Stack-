import { GET_CUSTOMER, CUSTOMER_ERROR } from '../actions/types';

const initialState = {
  customer: '',
  customers: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMER:
      return {
        ...state,
        customer: payload,
        loading: false,
      };
    case CUSTOMER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
