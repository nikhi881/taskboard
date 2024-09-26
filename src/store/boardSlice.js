import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    // Array of tasks
  ]
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

export default boardSlice.reducer;