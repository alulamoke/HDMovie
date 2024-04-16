import { createSlice } from '@reduxjs/toolkit';
import localStore from '../utils/localStore';

const initialState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentails: (state, { payload }) => {
      state.currentUser = payload.currentUser;
    },
    logout: () => {
      localStore.deauthenticateUser();
      return initialState;
    },
  },
});

export const { setCredentails, logout } = authSlice.actions;
export default authSlice.reducer;
