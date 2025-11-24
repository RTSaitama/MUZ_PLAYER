import { createApi } from '@reduxjs/toolkit/query/react';
import { Track, Album } from '../../types/typedefs';
import { BaseQuery } from './baseQuery';

interface iTunesFeedResponse {
  feed: {
    entry: any[];
  };
}
interface iTunesAlbumLookupResponse {
  results: any[];
}

export const itunesApi = createApi({
  reducerPath: 'itunesApi',
  baseQuery: BaseQuery,
  endpoints: (builder) => ({

    getTopTracks: builder.query<Track[], void>({
      query: () => 'topsongs/limit=20/json',
      transformResponse: (response: iTunesFeedResponse) => {
        return response.feed.entry.map((entry: any) => ({
          id: entry.id.attributes['im:id'],
          title: entry['im:name'].label,
          artist: entry['im:artist'].label,
          image: entry['im:image'][2].label,
          preview: entry.link.find((l: any) =>
            l.attributes?.type?.includes('audio')
          )?.attributes.href || '',
          albumId: entry['im:collection']?.link?.attributes?.href?.split('/')[6]?.split('?')[0] || ''
        }));
      },
      keepUnusedDataFor: 300,
    }),

    getTopAlbums: builder.query<Album[], void>({
      query: () => 'topalbums/limit=20/json',
      transformResponse: (response: iTunesFeedResponse) => {
        return response.feed.entry.map((entry: any) => ({
          id: entry.id.attributes['im:id'],
          title: entry['im:name'].label,
          artist: entry['im:artist'].label,
          image: entry['im:image'][2].label,

        }));
      },
      keepUnusedDataFor: 300,
    }),


    getAlbumTracks: builder.query<Track[], string>({
      query: (albumId) =>
        `https://api.allorigins.win/raw?url=https://itunes.apple.com/lookup?id=${albumId}&entity=song&limit=200`,
      transformResponse: (response: any) => {
        // Якщо response рядок - парсимо
        const data = typeof response === 'string' ? JSON.parse(response) : response;

        if (!data.results || data.results.length < 2) {
          return [];
        }

        const results = data.results.slice(1);
        const albumImage = data.results[0].artworkUrl100 || '';

        return results
          .filter((entry: any) => entry.trackId && entry.kind === 'song')
          .map((entry: any) => ({
            id: entry.trackId.toString(),
            title: entry.trackName || 'Unknown',
            artist: entry.artistName || '',
            image: albumImage,
            preview: entry.previewUrl || '',
            trackNumber: entry.trackNumber || 0,
          }))
          .sort((a: Track, b: Track) => (a.trackNumber || 0) - (b.trackNumber || 0));
      },
    }),

  }),
});

export const {
  useGetTopTracksQuery,
  useGetTopAlbumsQuery,
  useGetAlbumTracksQuery,
} = itunesApi;