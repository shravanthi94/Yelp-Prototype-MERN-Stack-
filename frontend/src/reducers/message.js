import {
  SEND_MESSAGE_ERROR,
  CONVERSATION_SUCCESS,
  CONVERSATION_ERROR,
} from '../actions/types';

const initialState = {
  conversation: '',
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CONVERSATION_SUCCESS:
      return {
        ...state,
        conversation: payload,
        loading: false,
      };
    case SEND_MESSAGE_ERROR:
    case CONVERSATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
