import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthReady: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuthReady = action.payload;
    },
  },
});

export const { setUser, setAuth } = authSlice.actions;
export default authSlice.reducer;