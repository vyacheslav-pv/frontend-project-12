/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchData from './fetchDataSlice.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: (state, { payload }) => {
      state.entities[payload.id].name = payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        channelsAdapter.addMany(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
      });
  },
});
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  setCurrentChannelId,
  addChannel,
  renameChannel,
  removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
