import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../apis/authApi';
import { isTokenValid } from '../../utils/AuthInit'
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const storedToken = localStorage.getItem('accessToken');
const validToken = isTokenValid(storedToken);

if (!validToken && storedToken) {
  localStorage.removeItem('accessToken');
}

const initialState: AuthState = {
  user: null,
  accessToken: validToken ? storedToken : null,
  isAuthenticated: validToken,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },

    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('accessToken');
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});