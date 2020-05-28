import axios from 'axios';
import { setAlert } from './alert';

import { GET_LIST, LIST_ERROR } from './types';

// Get all categories
export const getList = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/setting/list/${name}`);

    dispatch({
      type: GET_LIST,
      payload: res.data.payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert('List Error', 'danger'));
  }
};
