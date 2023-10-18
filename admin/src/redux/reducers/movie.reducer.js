import * as TYPES from '../types';

export const movieReducer = (
  state = { loading: true, progress: false },
  { type, payload }
) => {
  switch (type) {
    case TYPES.SET_MOVIE_ACTION_LOADING:
      return { ...state, progress: true };
    case TYPES.CREATE_MOVIE:
      state.data.unshift(payload);
      return { ...state };
    case TYPES.DELETE_MOVIE:
      const index = state.data.findIndex((el) => el._id === payload._id);
      state.data.splice(index, 1);
      return { ...state };
    case TYPES.REMOVE_MOVIE_ACTION_LOADING:
      return { ...state, progress: false };
    case TYPES.SET_MOVIES_LOADING:
      return { ...state, loading: true };
    case TYPES.GET_MOVIES_FOR_ADMIN:
    case TYPES.GET_MOVIES_BY_SEARCH:
      return { ...state, ...payload };
    case TYPES.REMOVE_MOVIES_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
