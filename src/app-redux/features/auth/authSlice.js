import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import { uiSlice } from '../features/ui/uiSlice'
import axios from 'axios';
import { auth } from '../../../firebase/firebase'; 


const initialState = {
  user: null,
  isAuthReady: false,
  loading: true,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser :(state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthReady = true;
      }else {
        state.user = null;
        state.isAuthReady = false;
      }
      state.loading = false;
    }
  }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;