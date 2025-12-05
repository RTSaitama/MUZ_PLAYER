import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
import type { Playlist, MediaItem } from "../../types/typedefs";
const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:3005/api';



export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',

  baseQuery: fetchBaseQuery({ baseUrl }),
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

    addMediaItemToPlaylist: builder.mutation<Playlist, { playlistId: number, MediaItem: MediaItem }>({
      query: ({ playlistId, MediaItem }) => ({
        url: `playlists/${playlistId}/tracks`,
        method: 'POST',
        body: MediaItem,
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
})

export const {
  useGetPlaylistsQuery,
  useGetPlaylistQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useAddMediaItemToPlaylistMutation,
  useRemoveMediaItemFromPlaylistMutation,
} = playlistsApi;