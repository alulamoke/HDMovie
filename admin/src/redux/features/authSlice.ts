import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TUser } from "@/utils/types";

type TInitialState = {
  user: TUser | undefined;
};

const initialState: TInitialState = {
  user: undefined,
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
