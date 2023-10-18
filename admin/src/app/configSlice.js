import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  base_url: '',
  staticCategories: [],
  genres: [],
};

const configSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setConfiguration: (state, { payload }) => {
      state.base_url = payload.base_url;
      state.staticCategories = payload.staticCategories;
    },
    setGenres: (state, { payload }) => {
      state.genres = payload.data;
    },
  },
});

export const { setConfiguration, setGenres } = configSlice.actions;
export default configSlice.reducer;
