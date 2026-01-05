 // src/store/apis/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshResponse {
  accessToken: string;
}

const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:3005/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials
      })
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      })
    }),

    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST'
      })
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      })
    })
  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation
} = authApi;