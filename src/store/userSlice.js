import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Alfred Bryant',
  profilePicture: './assets/profile-picture.jpg',
  email: 'alfred@example.com',
  status: 'Online',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;