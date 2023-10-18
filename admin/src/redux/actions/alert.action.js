import * as TYPES from '../types';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = Math.round(Math.random(5000) * 1234567899898789);
  dispatch({
    type: TYPES.SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(
    () => dispatch({ type: TYPES.REMOVE_ALERT, payload: id }),
    timeout
  );
};
