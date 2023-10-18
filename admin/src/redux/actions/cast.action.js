import * as TYPES from '../types';
import history from '../../history';

import { setAlert } from './alert.action';
import castService from '../../services/cast.service';

// Create cast
export const createCast = (body) => async (dispatch) => {
  try {
    const res = await castService.createCast(body);
    dispatch({ type: TYPES.ADD_CAST, payload: res.data });
    dispatch(setAlert(`Cast ${res.data.fullname} created.`, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

export const updateCast = (id, body) => async (dispatch) => {
  try {
    const res = await castService.updateCast(id, body);
    dispatch({ type: TYPES.UPDATE_CAST, payload: res.data });
    dispatch(setAlert(`Cast ${res.data.fullname} updated.`, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

// Get casts
export const getCasts = () => async (dispatch) => {
  try {
    dispatch({ type: TYPES.SET_CASTS_LOADING });
    const res = await castService.getCasts();
    dispatch({ type: TYPES.GET_CASTS, payload: res.data });
    dispatch({ type: TYPES.REMOVE_CASTS_LOADING });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

export const deleteCast = (id) => async (dispatch) => {
  try {
    const res = await castService.deleteCast(id);
    dispatch({ type: TYPES.DELETE_CAST, payload: res.data });
    dispatch(setAlert(`Cast ${res.data.fullname} deleted.`, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

// Set loading to true for next render
export const clearCasts = () => {
  return {
    type: TYPES.SET_CASTS_LOADING,
  };
};
