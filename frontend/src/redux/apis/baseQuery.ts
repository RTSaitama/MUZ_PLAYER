import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const BaseQuery = fetchBaseQuery({
  baseUrl: 'https://muz-player.onrender.com/api',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});