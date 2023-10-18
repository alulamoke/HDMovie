import * as TYPES from '../types';
import history from '../../history';

import { setAlert } from './alert.action';
import adminService from '../../services/admin.service';

// get user
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: TYPES.SET_USERS_LOADING });
    const res = await adminService.getUsers();
    dispatch({ type: TYPES.GET_USERS, payload: res.data });
    dispatch({ type: TYPES.REMOVE_USERS_LOADING });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

// Set loading to true for next render
export const clearUsers = () => {
  return {
    type: TYPES.SET_USERS_LOADING,
  };
};
