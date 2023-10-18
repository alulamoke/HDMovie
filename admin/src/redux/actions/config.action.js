import * as TYPES from '../types';
import { apiV1 } from '../../api';
import history from '../../history';

import { setAlert } from './alert.action';

export const init = () => async (dispatch) => {
  dispatch({ type: TYPES.SET_LOADING });
  await dispatch(getConfig());
  dispatch({ type: TYPES.REMOVE_LOADING });
};

export const getConfig = () => async (dispatch) => {
  try {
    const res = await apiV1().get('/config', { params: { type: 'admin' } });
    dispatch({ type: TYPES.GET_CONFIG, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

// Set the current selected menu (discover or genre), if is valid
export const setSelectedMenu = (name) => (dispatch, getState) => {
  const { staticCategories, data } = getState().config;
  if (!name) {
    dispatch({ type: TYPES.REMOVE_SELECTED_MENU });
  } else if (
    staticCategories.find((category) => category === name) ||
    data.find((genre) => genre.name === name)
  ) {
    dispatch({ type: TYPES.SELECTED_MENU, payload: name });
  } else {
    history.push('/404');
  }
};
