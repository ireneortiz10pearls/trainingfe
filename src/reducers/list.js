import { GET_LIST, LIST_ERROR } from '../actions/types';

const initialState = {
  list: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LIST:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case LIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        list: null,
      };
    default:
      return state;
  }
}
