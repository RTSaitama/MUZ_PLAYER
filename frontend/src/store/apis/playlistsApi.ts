import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
import type { Playlist,MediaItem } from "../../types/typedefs";
const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:3005/api';


 
export const playlistsApi = createApi({
  reducerPath:'playlistsApi',

  baseQuery: fetchBaseQuery({baseUrl}),
  tagTypes: ['Playlists'],
  endpoints: (builder) => ({

    getPlaylists: builder.query<Playlist[], void>({
      query: () => 'playlists',
      providesTags: [{ type: 'Playlists' }],

    }),

    getPlaylist: builder.query<Playlist, number>({
      query: (id) => `playlists/${id}`,
    }),
    createPlaylist: builder.mutation<Playlist, string>({
      query: ( name ) => ({
        url:`playlists/`,
        method: "POST",
        body:{ name },
      }),
      invalidatesTags: [{ type: 'Playlists' }],
    }),
    deletePlaylist: builder.mutation<void, number>({
      query: ( id ) => ({
        url: `playlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'Playlists' }],
    }),

    addMediaItemToPlaylist: builder.mutation<Playlist, { playlistId:number, MediaItem: MediaItem }>({
      query: ({ playlistId, MediaItem }) => ({
        url: `playlists/${playlistId}/tracks`,
        method:'POST',
        body:MediaItem,
      }),
      invalidatesTags:(result, error, {playlistId}) => [
        { type: 'Playlists', id: playlistId }
      ]
    }),
   removeTrackFromPlaylist: builder.mutation<Playlist, { playlistId:number, trackId:string}>({
      query: ({ playlistId, trackId }) => ({
        url: `playlists/${playlistId}/tracks/${trackId}`,
        method: 'DELETE',
      }),
      invalidatesTags:(result, error, {playlistId}) => [
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
  useRemoveTrackFromPlaylistMutation,
  } = playlistsApi;