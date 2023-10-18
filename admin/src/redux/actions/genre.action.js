import * as TYPES from '../types';
import history from '../../history';

import { setAlert } from './alert.action';
import genreService from '../../services/genre.service';

// Create cast
export const createGenre = (body) => async (dispatch) => {
  try {
    const res = await genreService.createGenre(body);
    dispatch({ type: TYPES.ADD_GENRE, payload: res.data });
    dispatch(setAlert(`Genre ${res.data.name} created.`, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

export const getGenres = () => async (dispatch) => {
  try {
    dispatch({ type: TYPES.SET_GENRES_LOADING });
    const res = await genreService.getGenres();
    dispatch({ type: TYPES.GET_GENRES, payload: res.data });
    dispatch({ type: TYPES.REMOVE_GENRES_LOADING });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

export const deleteGenre = (id) => async (dispatch) => {
  try {
    const res = await genreService.deleteGenre(id);
    dispatch({ type: TYPES.DELETE_GENRE, payload: res.data });
    dispatch(setAlert(`Genre ${res.data.name} deleted.`, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

// Set loading to true for next render
export const clearGenres = () => {
  return {
    type: TYPES.SET_GENRES_LOADING,
  };
};
