import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSearchList } from 'pages/api/searchList';

export type STATUS = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface SearchParams {
  login_token?: string;
  search_phrase: string;
}

export interface SearchList {
  name: string;
  search_msv: { date: string; sv: number }[];
}

export type SearchLists = SearchList[];

export interface SearchListRes {
  product_trends: SearchLists;
}

const initialState: {
  initValue: string;
  dataList: SearchLists;
  status: STATUS;
  error: any;
} = {
  initValue: '',
  dataList: [],
  status: 'idle',
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    onSearchChange: (state, { payload }) => {
      state.initValue = payload;
    },
    getLists: (state, action) => {
      console.log(state, action);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.dataList = action.payload.product_trends;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const fetchLists = createAsyncThunk(
  'search/fetchLists',
  async (params: SearchParams) => {
    console.log('params: ', params);
    const response = await getSearchList(params);
    console.log('response: ', response);
    return response.data;
  }
);

export const { onSearchChange } = searchSlice.actions;

export default searchSlice.reducer;
