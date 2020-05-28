import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_USER,
  GET_USERS,
  USER_ERROR,
  UPDATE_USER,
  CLEAR_USER,
} from '../actions/types';

// Get all users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/user');

    dispatch({
      type: GET_USERS,
      payload: res.data.payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get user by ID
export const getUserById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/user/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data.payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Register User
export const register = ({
  firstName,
  lastName,
  email,
  password,
  roleId,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const isActive = true;
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    roleId,
    isActive,
  });

  try {
    const res = await axios.post('/api/user', body, config);
    dispatch(setAlert('Member Added', 'success'));
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.payload,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (err) {
      dispatch(
        setAlert('Input error. Check your information and try again.', 'danger')
      );
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const editUser = (
  { id, firstName, lastName, email, password, roleId },
  history
) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const isActive = true;
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    roleId,
    isActive,
  });

  try {
    const res = await axios.put(`/api/user/${id}`, body, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data.payload,
    });
    dispatch(setAlert('User Updated', 'success'));
    history.push('/users');
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete user (soft delete)
export const deleteUser = (id) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  let res = await axios.get(`/api/user/${id}`);

  try {
    res = await axios.put(
      `/api/user/${id}`,
      { ...res.data.payload, isActive: false },
      config
    );

    const users = await axios.get('/api/user');

    dispatch({
      type: UPDATE_USER,
      payload: res.data.payload,
    });
    dispatch(setAlert('User Deleted', 'success'));
    dispatch({
      type: GET_USERS,
      payload: users.data.payload,
    });
    dispatch({ type: CLEAR_USER });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};
