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
  LOGIN_SUCCESS,
} from '../actions/types';
import {loadUser} from './auth';

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
  history,
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
    history.push('/users');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
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
    let res = await axios.put(`/api/user/${id}`, body, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data.payload,
    });
    dispatch(setAlert('User Updated', 'success'));
    history.push('/users');
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const changePassword = (
  { id, firstName, lastName, email, password, roleId }, history
) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const isActive = true;
  let body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    roleId,
    isActive,
  });

  try {
    let res = await axios.put(`/api/user/${id}`, body, config);
    dispatch({
      type: UPDATE_USER,
      payload: res.data.payload,
    });
    dispatch(setAlert('Your password has been created successfully', 'success'));

    body = JSON.stringify({ email, password });
    res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    dispatch({
      type: USER_ERROR,
      payload: { msg:err },
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

export const forgotPassword = (email) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    dispatch(setAlert('An email was sent to reset your password.', 'success'));
    let res = await axios.get(`/api/user/forgotpassword/${email}`);
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    dispatch(
      setAlert(
        'An error occurred while sending an email to reset your password.',
        'danger'
      )
    );
  }
};
