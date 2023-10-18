import * as TYPES from '../types';

export const userReducer = (state = { loading: true }, { type, payload }) => {
  switch (type) {
    case TYPES.SET_USERS_LOADING:
      return { ...state, loading: true };
    case TYPES.GET_USERS:
      return { ...state, ...payload };
    case TYPES.REMOVE_USERS_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
