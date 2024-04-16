import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./features/authSlice";
import configSlice from "./features/configSlice";

export const store = configureStore({
  reducer: {
    config: configSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
