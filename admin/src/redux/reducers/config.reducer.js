import * as TYPES from '../types';

export const configReducer = (state = { loading: true }, { type, payload }) => {
  switch (type) {
    case TYPES.SET_LOADING:
      return { ...state, loading: true };
    case TYPES.GET_CONFIG:
      return { ...state, ...payload };
    case TYPES.SELECTED_MENU:
      return { ...state, selected: payload };
    case TYPES.REMOVE_SELECTED_MENU:
      return { ...state, selected: null };
    case TYPES.REMOVE_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
