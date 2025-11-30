import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { itunesApi } from "./apis/itunesApi";
import { playerSlice } from "./slices/playerSlice";
import { playlistsApi } from './apis/playlistsApi';
import { modalStatusSlice } from './slices/modalStatusSlice'
const rootReducer = combineReducers({
 player:playerSlice.reducer,
 modalStatus: modalStatusSlice.reducer,
 [itunesApi.reducerPath]: itunesApi.reducer,
 [playlistsApi.reducerPath]: playlistsApi.reducer,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itunesApi.middleware).concat(playlistsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;