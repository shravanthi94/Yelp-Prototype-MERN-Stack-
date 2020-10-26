import { GET_DASHBOARD, DASHBOARD_ERROR } from '../actions/types';

const initialState = {
  profile: '',
  profiles: [],
  dish: '',
  images: '',
  menu: [],
  reviews: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DASHBOARD:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    // case GET_IMAGES:
    //   return {
    //     ...state,
    //     images: payload,
    //     loading: false,
    //   };
    // case ADD_DISH_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //   };
    // case GET_MENU:
    //   return {
    //     ...state,
    //     menu: payload,
    //     loading: false,
    //   };
    // case GET_REVIEWS:
    //   return {
    //     ...state,
    //     reviews: payload,
    //     loading: false,
    //   };
    case DASHBOARD_ERROR:
      // case ADD_DISH_ERROR:
      // case GET_MENU_ERROR:
      // case GET_REVIEWS_ERROR:
      // case RES_IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
