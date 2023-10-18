import * as TYPES from '../types';
import localStore from '../../utils/localStore';

const INITIAL_STATE = {
  isAuthenticated: false,
  loading: true,
};

export const adminReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.SET_ADMIN_LOADING:
      return { ...state, loading: true };
    case TYPES.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case TYPES.ADMIN_LOADED:
      return { ...state, ...payload };
    case TYPES.LOGIN_SUCCESS:
      localStore.authenticateUser(payload);
      return { ...state, ...payload };
    case TYPES.REMOVE_ADMIN_LOADING:
      return { ...state, loading: false };
    case TYPES.AUTH_ERROR:
    case TYPES.LOGIN_FAIL:
    case TYPES.REGISTER_FAIL:
    case TYPES.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
