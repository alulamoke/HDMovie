import * as TYPES from '../types';

export const castReducer = (state = { loading: true }, { type, payload }) => {
  switch (type) {
    case TYPES.SET_CASTS_LOADING:
      return { ...state, loading: true };
    case TYPES.ADD_CAST:
      state.data.unshift(payload);
      return { ...state };
    case TYPES.GET_CASTS:
      return { ...state, ...payload };
    case TYPES.DELETE_CAST:
      const index = state.data.findIndex((el) => el._id === payload._id);
      state.data.splice(index, 1);
      return { ...state };
    case TYPES.REMOVE_CASTS_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
