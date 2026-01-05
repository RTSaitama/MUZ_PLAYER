import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { itunesApi } from "./apis/itunesApi";
import { playerSlice } from "./slices/playerSlice";
import { playlistsApi } from './apis/playlistsApi';
import { modalStatusSlice } from './slices/modalStatusSlice';
import { authApi } from './apis/authApi';
import { authSlice } from './slices/authSlice';

const rootReducer = combineReducers({
  player: playerSlice.reducer,
  modalStatus: modalStatusSlice.reducer,
  auth: authSlice.reducer,
  [itunesApi.reducerPath]: itunesApi.reducer,
  [playlistsApi.reducerPath]: playlistsApi.reducer,
  [authApi.reducerPath]: authApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(itunesApi.middleware)
      .concat(playlistsApi.middleware)
      .concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;