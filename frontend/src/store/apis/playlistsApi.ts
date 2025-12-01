import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
import type { Playlist,Track } from "../../types/typedefs";
const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3005/api';


 
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
      })
    }),

    addTrackToPlaylist: builder.mutation<Playlist, { playlistId:number, track: Track }>({
      query: ({ playlistId, track }) => ({
        url: `playlists/${playlistId}/tracks`,
        method:'POST',
        body:track,
      }) 
    }),
   removeTrackFromPlaylist: builder.mutation<Playlist, { playlistId:number, trackId:string}>({
      query: ({ playlistId, trackId }) => ({
        url: `playlists/${playlistId}/tracks/${trackId}`,
        method: 'DELETE',
      })
    }),
  })
})

export const { 
  useGetPlaylistsQuery,
  useGetPlaylistQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useAddTrackToPlaylistMutation,
  useRemoveTrackFromPlaylistMutation,
  } = playlistsApi;