import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_COURSECHAPTER,
  GET_COURSECHAPTERS,
  COURSECHAPTER_ERROR,
  UPDATE_COURSECHAPTER,
  ADD_COURSECHAPTER,
  CLEAR_COURSECHAPTER,
} from './types';

// Get all courseChapters
export const getCourseChapters = (id) => async (dispatch) => {
  dispatch({ type: CLEAR_COURSECHAPTER });
  try {
    const res = await axios.get(`/api/coursechapter/course/${id}`);

    dispatch({
      type: GET_COURSECHAPTERS,
      payload: res.data.payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: COURSECHAPTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get courseChapter by ID
export const getCourseChapterById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/coursechapter/${id}`);
    console.log(res.data.payload);
    dispatch({
      type: GET_COURSECHAPTER,
      payload: res.data.payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: COURSECHAPTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create courseChapter
export const addCourseChapter = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { courseId } = formData;

    const res = await axios.post('/api/coursechapter', formData, config);
    dispatch({
      type: GET_COURSECHAPTER,
      payload: res.data.payload,
    });

    dispatch({
      type: ADD_COURSECHAPTER,
      payload: res.data.payload,
    });

    dispatch(setAlert('Chapter Created', 'success'));
    history.push(`/courseedit/${courseId}`);
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COURSECHAPTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editCourseChapter = (formData, history) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const { courseId } = formData;

  console.log(courseId);
  console.log(formData);

  try {
    const res = await axios.put(
      `/api/coursechapter/${formData.id}`,
      formData,
      config
    );
    const courseChapters = await axios.get(
      `/api/coursechapter/course/${courseId}`
    );
    dispatch({
      type: UPDATE_COURSECHAPTER,
      payload: res.data.payload,
    });
    dispatch(setAlert('Chapter Updated', 'success'));
    dispatch({
      type: GET_COURSECHAPTERS,
      payload: courseChapters.data.payload,
    });
    history.push(`/courseedit/${courseId}`);
  } catch (err) {
    dispatch({
      type: COURSECHAPTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete courseChapter (soft delete)
export const deleteCourseChapter = (id) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  let res = await axios.get(`/api/courseChapter/${id}`);

  try {
    res = await axios.put(
      `/api/courseChapter/${id}`,
      { ...res.data.payload, isActive: false },
      config
    );

    const courseChapters = await axios.get('/api/courseChapter');

    dispatch({
      type: UPDATE_COURSECHAPTER,
      payload: res.data.payload,
    });
    dispatch(setAlert('CourseChapter Deleted', 'success'));
    dispatch({
      type: GET_COURSECHAPTERS,
      payload: courseChapters.data.payload,
    });
    dispatch({ type: CLEAR_COURSECHAPTER });
  } catch (err) {
    dispatch({
      type: COURSECHAPTER_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};
