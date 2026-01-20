import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
import type { Playlist, MediaItem } from "../../types/typedefs";
import type { RootState } from "../store";

const baseUrl = 'https://muz-player.onrender.com/api';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
  credentials: 'include'
});

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Playlists'],
  endpoints: (builder) => ({
    getPlaylists: builder.query<Playlist[], void>({
      query: () => 'playlists',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Playlists' as const, id })),
            { type: 'Playlists', id: 'LIST' },
          ]
          : [{ type: 'Playlists', id: 'LIST' }],
    }),

    getPlaylist: builder.query<Playlist, number>({
      query: (id) => `playlists/${id}`,
      providesTags: (result, error, id) => [
        { type: 'Playlists', id }
      ]
    }),

    createPlaylist: builder.mutation<Playlist, string>({
      query: (name) => ({
        url: `playlists/`,
        method: "POST",
        body: { name },
      }),
      invalidatesTags: [{ type: 'Playlists' }],
    }),

    deletePlaylist: builder.mutation<Playlist, number>({
      query: (id) => ({
        url: `playlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'Playlists' }],
    }),

    addMediaItemToPlaylist: builder.mutation<Playlist, { playlistId: number, mediaItem: MediaItem }>({
      query: ({ playlistId, mediaItem }) => ({
        url: `playlists/${playlistId}/tracks`,
        method: 'POST',
        body: mediaItem,
      }),
      invalidatesTags: (result, error, { playlistId }) => [
        { type: 'Playlists', id: playlistId }
      ]
    }),

    removeMediaItemFromPlaylist: builder.mutation<void, { playlistId: number, trackId: string }>({
      query: ({ playlistId, trackId }) => ({
        url: `playlists/${playlistId}/tracks/${trackId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { playlistId }) => [
        { type: 'Playlists', id: playlistId }
      ]
    }),
  })
});

export const {
  useGetPlaylistsQuery,
  useGetPlaylistQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useAddMediaItemToPlaylistMutation,
  useRemoveMediaItemFromPlaylistMutation,
} = playlistsApi;