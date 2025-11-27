import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { itunesApi } from "./apis/itunesApi";
import { playerSlice } from "./slices/playerSlice";

const rootReducer = combineReducers({
 player:playerSlice.reducer,
 [itunesApi.reducerPath]: itunesApi.reducer,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itunesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;