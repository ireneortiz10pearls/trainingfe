import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_TRAININGPATH,
  GET_TRAININGPATHS,
  TRAININGPATH_ERROR,
  UPDATE_TRAININGPATH,
  ADD_TRAININGPATH,
  CLEAR_TRAININGPATH,
  CLEAR_TRAININGPATHS,
  CLEAR_COURSE,
  COURSE_ERROR,
  GET_COURSES,
  CLEAR_COURSECHAPTERS,
  GET_COURSECHAPTERS,
  COURSECHAPTER_ERROR,
  ADD_TRAININGPATHSTATUS,
  TRAININGPATHSTATUS_ERROR,
} from './types';

// Get all trainingpaths
export const getUserCourses = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_TRAININGPATH });
  dispatch({ type: CLEAR_TRAININGPATHS });
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

export const getUserChapters = (id, courseId, userId) => async (dispatch) => {
  dispatch({ type: CLEAR_COURSECHAPTERS });
  try {
    const res = await axios.get(
      `/api/trainingpath/userchapter/${id}/${courseId}/${userId}`
    );

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
    history.push('/dashboard');
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

// Delete trainingpath (soft delete)
export const deleteTrainingPath = (coursesArr, userId, history) => async (
  dispatch
) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    await axios.put('/api/trainingpath', { coursesArr, userId }, config);

    dispatch(setAlert('TrainingPath Deleted', 'success'));
    dispatch({ type: CLEAR_TRAININGPATHS });
    const res = await axios.get(`/api/trainingpath/user/${userId}`);
    dispatch({
      type: GET_TRAININGPATHS,
      payload: res.data.payload,
    });
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: TRAININGPATH_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

// Create TrainingPathStatus
export const addTrainingPathStatus = (formData, userId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let { dateFinished } = formData;

    let myDate = new Date(dateFinished);

    formData = { ...formData, dateFinished: myDate };
    const res = await axios.post(
      '/api/trainingpath/trainingpathstatus',
      formData,
      config
    );
    dispatch(setAlert('Progress Logged', 'success'));
    dispatch({
      type: ADD_TRAININGPATHSTATUS,
      payload: res.data.payload,
    });

    const paths = await axios.get(`/api/trainingpath/user/${userId}`);
    dispatch({
      type: GET_TRAININGPATHS,
      payload: paths.data.payload,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: TRAININGPATHSTATUS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create TrainingPathStatus in batch
export const addBatchTrainingPathStatus = (
  chapterArr,
  formData,
  userId
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let { dateFinished } = formData;

    let myDate = new Date(dateFinished);

    formData = { ...formData, dateFinished: myDate };
    const res = await axios.post(
      '/api/trainingpath/trainingpathstatus/batch',
      { chapterArr, formData },
      config
    );
    dispatch(setAlert('Progress Logged', 'success'));
    dispatch({
      type: ADD_TRAININGPATHSTATUS,
      payload: res.data.payload,
    });

    const paths = await axios.get(`/api/trainingpath/user/${userId}`);
    dispatch({
      type: GET_TRAININGPATHS,
      payload: paths.data.payload,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: TRAININGPATHSTATUS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create TrainingPathStatus
export const editTrainingPathStatus = (formData, userId) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { chapterId, trainingPathId, dateFinished } = formData;

    let myDate = new Date(dateFinished);

    formData = { ...formData, dateFinished: myDate };

    const trainingPathStatus = await axios.put(
      `/api/trainingpath/trainingpathstatus/${chapterId}/${trainingPathId}`,
      formData,
      config
    );

    const res = await axios.get(`/api/trainingpath/user/${userId}`);
    dispatch({
      type: GET_TRAININGPATHS,
      payload: res.data.payload,
    });

    dispatch(setAlert('Progress Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: TRAININGPATHSTATUS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
