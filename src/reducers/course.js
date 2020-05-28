import {
  GET_COURSE,
  COURSE_ERROR,
  CLEAR_COURSE,
  UPDATE_COURSE,
  GET_COURSES,
} from '../actions/types';

const initialState = {
  course: null,
  courses: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COURSE:
    case UPDATE_COURSE:
      return {
        ...state,
        course: payload,
        loading: false,
      };
    case GET_COURSES:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        course: null,
      };
    case CLEAR_COURSE:
      return {
        ...state,
        course: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
