import {
  GET_CATEGORY,
  CATEGORY_ERROR,
  CLEAR_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORIES,
} from '../actions/types';

const initialState = {
  category: null,
  categories: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY:
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        category: null,
      };
    case CLEAR_CATEGORY:
      return {
        ...state,
        category: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
