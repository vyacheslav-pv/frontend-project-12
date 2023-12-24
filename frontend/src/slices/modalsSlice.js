/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalInfo: { type: null, channel: null },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModalInfo: (state, action) => {
      const modalInfo = action.payload;
      state.modalInfo = modalInfo;
    },
  },
});

export const {
  setModalInfo,
} = modalsSlice.actions;

export default modalsSlice.reducer;
