import {
  GET_TRAININGPATH,
  TRAININGPATH_ERROR,
  CLEAR_TRAININGPATH,
  UPDATE_TRAININGPATH,
  GET_TRAININGPATHS,
  ADD_TRAININGPATH,
  CLEAR_TRAININGPATHS,
} from '../actions/types';

const initialState = {
  trainingpath: null,
  trainingpaths: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TRAININGPATH:
    case UPDATE_TRAININGPATH:
      return {
        ...state,
        trainingpath: payload,
        loading: false,
      };
    case GET_TRAININGPATHS:
      return {
        ...state,
        trainingpaths: payload,
        loading: false,
      };
    case ADD_TRAININGPATH:
      return {
        ...state,
        trainingpaths: [...state.trainingpaths, payload],
        loading: false,
      };
    case TRAININGPATH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        trainingpath: null,
      };
    case CLEAR_TRAININGPATH:
      return {
        ...state,
        trainingpath: null,
        loading: false,
      };
    case CLEAR_TRAININGPATHS:
      return {
        ...state,
        trainingpath: null,
        trainingpaths: [],
        loading: false,
      };
    default:
      return state;
  }
}
