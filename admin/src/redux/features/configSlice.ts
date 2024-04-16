import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  base_url: string | undefined;
};

const initialState: TInitialState = {
  base_url: "",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfiguration: (state, { payload }) => {
      state.base_url = payload.base_url;
    },
  },
});

export const { setConfiguration } = configSlice.actions;
export default configSlice.reducer;
