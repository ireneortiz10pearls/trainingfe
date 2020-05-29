import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_CATEGORY,
  GET_CATEGORIES,
  CATEGORY_ERROR,
  UPDATE_CATEGORY,
  CLEAR_CATEGORY,
} from './types';

// Get all categories
export const getCategories = () => async (dispatch) => {
  dispatch({ type: CLEAR_CATEGORY });
  try {
    const res = await axios.get('/api/category');

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data.payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get category by ID
export const getCategoryById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/category/${id}`);

    dispatch({
      type: GET_CATEGORY,
      payload: res.data.payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create category
export const addCategory = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/category', formData, config);

    dispatch({
      type: GET_CATEGORY,
      payload: res.data.payload,
    });

    dispatch(setAlert('Category Created', 'success'));
    history.push('/categories');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editCategory = (formData, history) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const res = await axios.put(
      `/api/category/${formData.id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data.payload,
    });
    dispatch(setAlert('Category Updated', 'success'));
    history.push('/categories');
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete category (soft delete)
export const deleteCategory = (id) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  let res = await axios.get(`/api/category/${id}`);

  try {
    res = await axios.put(
      `/api/category/${id}`,
      { ...res.data.payload, isActive: false },
      config
    );

    const categories = await axios.get('/api/category');

    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data.payload,
    });
    dispatch(setAlert('Category Deleted', 'success'));
    dispatch({
      type: GET_CATEGORIES,
      payload: categories.data.payload,
    });
    dispatch({ type: CLEAR_CATEGORY });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};
