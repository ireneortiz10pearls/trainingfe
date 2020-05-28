import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_ERROR,
  CLEAR_USER,
  GET_USER,
  UPDATE_USER,
  GET_USERS,
} from '../actions/types';

const initialState = {
  loading: true,
  user: null,
  users: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: state.user,
      };
    case USER_ERROR:
    case REGISTER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case GET_USER:
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    default:
      return state;
  }
}
