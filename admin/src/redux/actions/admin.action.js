import * as TYPES from '../types';
import history from '../../history';

import { setAlert } from './alert.action';
import adminService from '../../services/admin.service';
import localStore from '../../utils/localStore';

// signup user
export const SignupAdmin = (data) => async (dispatch) => {
  try {
    const res = await adminService.signup(data);
    dispatch({ type: TYPES.REGISTER_SUCCESS });
    dispatch(setAlert(res.data.message, 'info'));
    history.push('/login');
  } catch (err) {
    dispatch({ type: TYPES.REGISTER_FAIL });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

// Login user
export const LoginAdmin = (data) => async (dispatch) => {
  try {
    const res = await adminService.login(data);
    dispatch({ type: TYPES.LOGIN_SUCCESS, payload: res.data });
    dispatch({ type: TYPES.SET_AUTHENTICATED });
    dispatch(setAlert(`Welcome ${res.data.currentUser.fullname}.`, 'success'));
    history.push('/');
  } catch (err) {
    dispatch({ type: TYPES.LOGIN_FAIL });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

// Get user data
export const getLoggedInAdminInfo = () => async (dispatch) => {
  try {
    dispatch({ type: TYPES.SET_ADMIN_LOADING });
    const res = await adminService.getLoggedInAdminInfo();
    dispatch({ type: TYPES.ADMIN_LOADED, payload: res.data });
    dispatch({ type: TYPES.SET_AUTHENTICATED });
    dispatch({ type: TYPES.REMOVE_ADMIN_LOADING });
  } catch (err) {
    dispatch({ type: TYPES.AUTH_ERROR });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

//Logout a user
export const logout = () => async (dispatch) => {
  try {
    await adminService.logout();
    localStore.deauthenticateUser();
    dispatch({ type: TYPES.LOGOUT_SUCCESS });
    history.push('/');
    dispatch(setAlert(`Logout success.`, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};
