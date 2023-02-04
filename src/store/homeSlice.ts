import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    value: '',
  },
  reducers: {
    setHomeSearch: (state, { payload }) => {
      state.value = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setHomeSearch } = homeSlice.actions;

export default homeSlice.reducer;
