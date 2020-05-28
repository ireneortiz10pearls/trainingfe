import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_COURSE,
  GET_COURSES,
  COURSE_ERROR,
  UPDATE_COURSE,
  CLEAR_COURSE,
} from './types';

// Get all courses
export const getCourses = () => async (dispatch) => {
  dispatch({ type: CLEAR_COURSE });
  try {
    const res = await axios.get('/api/course');

    dispatch({
      type: GET_COURSES,
      payload: res.data.payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get course by ID
export const getCourseById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/course/${id}`);

    dispatch({
      type: GET_COURSE,
      payload: res.data.payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create course
export const addCourse = (formData, tags, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      '/api/course',
      { ...formData, tags: tags },
      config
    );

    dispatch({
      type: GET_COURSE,
      payload: res.data.payload,
    });

    dispatch(setAlert('Course Created', 'success'));
    history.push(`/courseedit/${res.data.payload.id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err);

    if (errors) {
      errors.forEach((error) =>
        dispatch(
          setAlert(
            'Input error. Check your information and try again.',
            'danger'
          )
        )
      );
    }

    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editCourse = (formData, tags, history) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const res = await axios.put(
      `/api/course/${formData.id}`,
      { ...formData, tags: tags },
      config
    );

    dispatch({
      type: UPDATE_COURSE,
      payload: res.data.payload,
    });
    dispatch(setAlert('Course Updated', 'success'));
    history.push('/courses');
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete course (soft delete)
export const deleteCourse = (id) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  let res = await axios.get(`/api/course/${id}`);

  try {
    res = await axios.put(
      `/api/course/${id}`,
      { ...res.data.payload, isActive: false },
      config
    );

    const courses = await axios.get('/api/course');

    dispatch({
      type: UPDATE_COURSE,
      payload: res.data.payload,
    });
    dispatch(setAlert('Course Deleted', 'success'));
    dispatch({
      type: GET_COURSES,
      payload: courses.data.payload,
    });
    dispatch({ type: CLEAR_COURSE });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};
