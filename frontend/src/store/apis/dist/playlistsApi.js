"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useRemoveMediaItemFromPlaylistMutation = exports.useAddMediaItemToPlaylistMutation = exports.useDeletePlaylistMutation = exports.useCreatePlaylistMutation = exports.useGetPlaylistQuery = exports.useGetPlaylistsQuery = exports.playlistsApi = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:3005/api';
exports.playlistsApi = react_1.createApi({
    reducerPath: 'playlistsApi',
    baseQuery: react_1.fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['Playlists'],
    endpoints: function (builder) { return ({
        getPlaylists: builder.query({
            query: function () { return 'playlists'; },
            providesTags: function (result) {
                return result
                    ? __spreadArrays(result.map(function (_a) {
                        var id = _a.id;
                        return ({ type: 'Playlists', id: id });
                    }), [
                        { type: 'Playlists', id: 'LIST' },
                    ]) : [{ type: 'Playlists', id: 'LIST' }];
            }
        }),
        getPlaylist: builder.query({
            query: function (id) { return "playlists/" + id; },
            providesTags: function (result, error, id) { return [
                { type: 'Playlists', id: id }
            ]; }
        }),
        createPlaylist: builder.mutation({
            query: function (name) { return ({
                url: "playlists/",
                method: "POST",
                body: { name: name }
            }); },
            invalidatesTags: [{ type: 'Playlists' }]
        }),
        deletePlaylist: builder.mutation({
            query: function (id) { return ({
                url: "playlists/" + id,
                method: "DELETE"
            }); },
            invalidatesTags: [{ type: 'Playlists' }]
        }),
        addMediaItemToPlaylist: builder.mutation({
            query: function (_a) {
                var playlistId = _a.playlistId, MediaItem = _a.MediaItem;
                return ({
                    url: "playlists/" + playlistId + "/tracks",
                    method: 'POST',
                    body: MediaItem
                });
            },
            invalidatesTags: function (result, error, _a) {
                var playlistId = _a.playlistId;
                return [
                    { type: 'Playlists', id: playlistId }
                ];
            }
        }),
        removeMediaItemFromPlaylist: builder.mutation({
            query: function (_a) {
                var playlistId = _a.playlistId, trackId = _a.trackId;
                return ({
                    url: "playlists/" + playlistId + "/tracks/" + trackId,
                    method: 'DELETE'
                });
            },
            invalidatesTags: function (result, error, _a) {
                var playlistId = _a.playlistId;
                return [
                    { type: 'Playlists', id: playlistId }
                ];
            }
        })
    }); }
});
exports.useGetPlaylistsQuery = exports.playlistsApi.useGetPlaylistsQuery, exports.useGetPlaylistQuery = exports.playlistsApi.useGetPlaylistQuery, exports.useCreatePlaylistMutation = exports.playlistsApi.useCreatePlaylistMutation, exports.useDeletePlaylistMutation = exports.playlistsApi.useDeletePlaylistMutation, exports.useAddMediaItemToPlaylistMutation = exports.playlistsApi.useAddMediaItemToPlaylistMutation, exports.useRemoveMediaItemFromPlaylistMutation = exports.playlistsApi.useRemoveMediaItemFromPlaylistMutation;
