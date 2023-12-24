import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchData from './fetchDataSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      });
  },
});
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
