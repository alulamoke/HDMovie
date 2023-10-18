import * as TYPES from '../types';
const INITIAL_STATE = {
  alerts: [],
  showAlert: false,
};

const setAlert = (state, payload) => ({
  ...state,
  alerts: [...state.alerts, payload],
  showAlert: true,
});

const removeAlert = (state, payload) => ({
  ...state,
  alerts: [...state.alerts].filter((alert) => alert.id !== payload),
  showAlert: false,
});

export const alertReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.SET_ALERT:
      return setAlert(state, payload);
    case TYPES.REMOVE_ALERT:
      return removeAlert(state, payload);
    default:
      return state;
  }
};
