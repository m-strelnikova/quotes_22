import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuote = createAsyncThunk(
  'quote/fetchQuote',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/random');
      return response.data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: '',
    author: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuote.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quote = action.payload.q;
        state.author = action.payload.a;
      })
      .addCase(fetchQuote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default quoteSlice.reducer;