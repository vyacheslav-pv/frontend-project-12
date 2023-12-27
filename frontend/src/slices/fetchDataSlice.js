import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export default createAsyncThunk(
  'data/fetchData',
  async () => {
    const response = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
    return response.data;
  },
);
