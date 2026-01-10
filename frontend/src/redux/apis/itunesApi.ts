 import { createApi } from '@reduxjs/toolkit/query/react';
import { Track, Album } from '../../types/typedefs';
import { BaseQuery } from './baseQuery';
import type { 
  iTunesFeedResponse,
  iTunesFeedEntry,
  iTunesSearchResponse, 
  iTunesSearchResult, 
  iTunesAlbumLookupResponse, 
  iTunesAlbumResult
} from '../../types/typedefs';


export const itunesApi = createApi({
  reducerPath: 'itunesApi',
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getTopTracks: builder.query<Track[], void>({
      query: () => 'topsongs/limit=20/json',
      transformResponse: (response: iTunesFeedResponse) => {
        return response.feed.entry.map((entry: iTunesFeedEntry) => ({
          id: entry.id.attributes['im:id'],
          title: entry['im:name'].label,
          artist: entry['im:artist'].label,
          image: entry['im:image'][2].label,
          preview: entry.link?.find((l) =>
            l.attributes?.type?.includes('audio')
          )?.attributes?.href || '',
          albumId: entry['im:collection']?.link?.attributes?.href?.split('/')[6]?.split('?')[0] || ''
        }));
      },
      keepUnusedDataFor: 300,
    }),

    getTopAlbums: builder.query<Album[], void>({
      query: () => 'topalbums/limit=20/json',
      transformResponse: (response: iTunesFeedResponse) => {
        return response.feed.entry.map((entry: iTunesFeedEntry) => ({
          id: entry.id.attributes['im:id'],
          title: entry['im:name'].label,
          artist: entry['im:artist'].label,
          image: entry['im:image'][2].label,
        }));
      },
      keepUnusedDataFor: 300,
    }),

    searchTracks: builder.query<Track[], string>({
      query: (searchTerm) =>
        `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=song&limit=20`)}`,
      transformResponse: (response: iTunesSearchResponse) => {
        if (!response.results) {
          return [];
        }
        return response.results
          .filter((entry: iTunesSearchResult) => entry.trackId && entry.kind === 'song')
          .map((entry: iTunesSearchResult) => ({
            id: entry.trackId.toString(),
            title: entry.trackName || 'Unknown',
            artist: entry.artistName || '',
            image: entry.artworkUrl100 || '',
            preview: entry.previewUrl || '',
            trackNumber: 0,
          }));
      }
    }),

    getAlbumTracks: builder.query<Track[], string>({
      query: (albumId) =>
        `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${albumId}&entity=song&limit=200`)}`,
      transformResponse: (response: iTunesAlbumLookupResponse) => {
        if (!response.results || response.results.length < 2) {
          return [];
        }

        const results = response.results.slice(1);
        const albumImage = response.results[0].artworkUrl100 || '';

        return results
          .filter((entry: iTunesAlbumResult) => entry.trackId && entry.kind === 'song')
          .map((entry: iTunesAlbumResult) => ({
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
  useSearchTracksQuery,
} = itunesApi;