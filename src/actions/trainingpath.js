import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_TRAININGPATH,
  GET_TRAININGPATHS,
  TRAININGPATH_ERROR,
  UPDATE_TRAININGPATH,
  ADD_TRAININGPATH,
  CLEAR_TRAININGPATH,
  CLEAR_COURSE,
  COURSE_ERROR,
  GET_COURSES,
} from './types';

// Get all trainingpaths
export const getUserCourses = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_TRAININGPATH });
  try {
    const res = await axios.get(`/api/trainingpath/user/${userId}`);
    dispatch({
      type: GET_TRAININGPATHS,
      payload: res.data.payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: TRAININGPATH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get user available courses
export const getAvailableCourses = (id) => async (dispatch) => {
  dispatch({ type: CLEAR_COURSE });
  try {
    const res = await axios.get(`/api/course/available/${id}`);

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

// Get trainingpath by ID
export const getTrainingPathById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/trainingpath/${id}`);
    console.log(res.data.payload);
    dispatch({
      type: GET_TRAININGPATH,
      payload: res.data.payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: TRAININGPATH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create trainingpath
export const addUserCourses = (coursesArr, userId, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post('/api/trainingpath', { coursesArr, userId }, config);

    const pathsRes = await axios.get(`/api/trainingpath/user/${userId}`);

    dispatch({
      type: GET_TRAININGPATHS,
      payload: pathsRes.data.payload,
    });

    dispatch(setAlert('Courses Saved', 'success'));
    history.push('/trainingpaths');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: TRAININGPATH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editTrainingPath = (formData, history) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const { courseId } = formData;
  try {
    const res = await axios.put(
      `/api/trainingpath/${formData.id}`,
      formData,
      config
    );
    const trainingpaths = await axios.get(
      `/api/trainingpath/course/${courseId}`
    );
    dispatch({
      type: UPDATE_TRAININGPATH,
      payload: res.data.payload,
    });
    dispatch(setAlert('Chapter Updated', 'success'));
    dispatch({
      type: GET_TRAININGPATHS,
      payload: trainingpaths.data.payload,
    });
    history.push(`/courseedit/${courseId}`);
  } catch (err) {
    dispatch({
      type: TRAININGPATH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete trainingpath (soft delete)
export const deleteTrainingPath = (coursesArr, userId) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    await axios.put('/api/trainingpath', { coursesArr, userId }, config);

    const res = await axios.get(`/api/trainingpath/user/${userId}`);

    dispatch(setAlert('TrainingPath Deleted', 'success'));
    dispatch({
      type: GET_TRAININGPATHS,
      payload: res.data.payload,
    });
    dispatch({ type: CLEAR_TRAININGPATH });
  } catch (err) {
    dispatch({
      type: TRAININGPATH_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};
