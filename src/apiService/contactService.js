import { createAsyncThunk } from '@reduxjs/toolkit';
import hostname from '~/utils/http';
import axios from 'axios';

export const contactUs = createAsyncThunk('contacts', async (communications) => {
  try {
    const req = await axios.post(`${hostname}/v1/contacts`, communications);
    const res = req.data.data;
    return res;
  } catch (err) {
    throw err.response !== null ? new Error(err.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');
  }
});
