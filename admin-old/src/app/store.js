import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import authReducer from './authSlice';
import configReducer from './configSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
  },
});

setupListeners(store.dispatch);
