import {
  GET_COURSECHAPTER,
  COURSECHAPTER_ERROR,
  CLEAR_COURSECHAPTER,
  UPDATE_COURSECHAPTER,
  GET_COURSECHAPTERS,
  ADD_COURSECHAPTER,
  CLEAR_COURSECHAPTERS,
} from '../actions/types';

const initialState = {
  courseChapter: null,
  courseChapters: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COURSECHAPTER:
    case UPDATE_COURSECHAPTER:
      return {
        ...state,
        courseChapter: payload,
        loading: false,
      };
    case GET_COURSECHAPTERS:
      return {
        ...state,
        courseChapters: payload,
        loading: false,
      };
    case ADD_COURSECHAPTER:
      return {
        ...state,
        courseChapters: [...state.courseChapters, payload],
        loading: false,
      };
    case COURSECHAPTER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        courseChapter: null,
      };
    case CLEAR_COURSECHAPTER:
      return {
        ...state,
        courseChapter: null,
        loading: false,
      };
    case CLEAR_COURSECHAPTERS:
      return {
        ...state,
        courseChapter: null,
        courseChapters: [],
        loading: false,
      };
    default:
      return state;
  }
}
