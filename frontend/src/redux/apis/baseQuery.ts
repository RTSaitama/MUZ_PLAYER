import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const BaseQuery = fetchBaseQuery({
  baseUrl: 'https://itunes.apple.com/us/rss/',

})