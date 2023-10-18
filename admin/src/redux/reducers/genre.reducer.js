import * as TYPES from '../types';

export const genreReducer = (state = { loading: true }, { type, payload }) => {
  switch (type) {
    case TYPES.SET_GENRES_LOADING:
      return { ...state, loading: true };
    case TYPES.ADD_GENRE:
      state.data.unshift(payload);
      return { ...state };
    case TYPES.GET_GENRES:
      return { ...state, ...payload };
    case TYPES.DELETE_GENRE:
      const index = state.data.findIndex((el) => el._id === payload._id);
      state.data.splice(index, 1);
      return { ...state };
    case TYPES.REMOVE_GENRES_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
