import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  userRole: 'student' | 'provider' | 'admin' | null;
  userEmail:string|null;
  userName:string|null;
}

const initialState: AuthState = {
  accessToken: null,
  userRole: null,
  userEmail: null,
  userName:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setUserRole(state, action: PayloadAction<'student' | 'provider' | 'admin'>) {
      state.userRole = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.userEmail = action.payload;
    },
    serUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    clearAuth(state) {
      state.accessToken = null;
      state.userRole = null;
      state.userEmail = null;
    },
  },
});

export const { setAccessToken, setUserRole, setUserEmail,serUserName, clearAuth } = authSlice.actions;
export default authSlice.reducer;
