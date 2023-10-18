import * as TYPES from '../types';
import history from '../../history';

import { setAlert } from './alert.action';
import movieService from '../../services/movie.service';

// Create movie
export const createMovie = (body) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.SET_MOVIE_ACTION_LOADING });
    const res = await movieService.createMovie(body);
    dispatch({ type: TYPES.CREATE_MOVIE, payload: res.data });
    dispatch({ type: TYPES.REMOVE_MOVIE_ACTION_LOADING });
    dispatch(setAlert(`${res.data.title} movie created.`, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

// Update movie info
export const updateMovieInfo = (id, body) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.SET_MOVIE_ACTION_LOADING });
    const res = await movieService.updateMovieInfo(id, body);
    dispatch({ type: TYPES.UPDATE_MOVIE_INFO, payload: res.data });
    dispatch({ type: TYPES.REMOVE_MOVIE_ACTION_LOADING });
    dispatch(setAlert(`${res.data.title} movie updated.`, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

// Get movies
export const getMoviesForAdmin = (page, sort_by) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.SET_MOVIES_LOADING });
    const params = {
      page,
      sort_by,
    };
    const res = await movieService.getMoviesForAdmin(params);
    dispatch({ type: TYPES.GET_MOVIES_FOR_ADMIN, payload: res.data });
    dispatch({ type: TYPES.REMOVE_MOVIES_LOADING });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

// Get movies by search
export const getMoviesBySearch = (query, page) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.SET_MOVIES_LOADING });
    const params = {
      q: query,
      page,
    };
    const res = await movieService.getMoviesBySearch(params);
    dispatch({ type: TYPES.GET_MOVIES_BY_SEARCH, payload: res.data });
    dispatch({ type: TYPES.REMOVE_MOVIES_LOADING });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

// Delete movie
export const deleteMovie = (id) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.SET_MOVIE_ACTION_LOADING });
    const res = await movieService.deleteMovie(id);
    dispatch({ type: TYPES.DELETE_MOVIE, payload: res.data });
    dispatch({ type: TYPES.REMOVE_MOVIE_ACTION_LOADING });
    dispatch(setAlert(`${res.data.title} movie deleted.`, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    history.push('/error');
  }
};

// Set loading to true for next render
export const clearMovies = () => {
  return {
    type: TYPES.SET_MOVIES_LOADING,
  };
};
