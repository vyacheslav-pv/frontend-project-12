import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

const getAuthHeader = (token) => ({ Authorization: `Bearer ${token}` });

export default createAsyncThunk(
  'data/fetchData',
  async ({ token, logOut }) => {
    try {
      const response = await axios.get(routes.usersPath(), { headers: getAuthHeader(token) });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        logOut();
      }
      throw error;
    }
  },
);
