import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Track } from '../../types/typedefs'
interface PlayerState {
  currentTrack: Track | null;
  playlistQueue: Track[];
  currentQueueIndex: number;
  searchQuery: string;
  isPlaying: boolean;
}
const initialState: PlayerState = {
  currentTrack: null ,
  playlistQueue: [],
  currentQueueIndex: 0 ,
  searchQuery: '',
  isPlaying:false,
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack:(state,action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    setPlaylistQueue:(state, action: PayloadAction<Track[]>) =>{
      state.playlistQueue = action.payload;
      state.currentQueueIndex = 0;
      if(action.payload.length > 0) {
        state.currentTrack = action.payload[0]
      }
    },
    setCurrentQueueIndex:(state, action: PayloadAction<number>) =>{ 
      if (action.payload >= 0 && action.payload < state.playlistQueue.length) {
        state.currentQueueIndex = action.payload;
        state.currentTrack = state.playlistQueue[action.payload]
      }
    },
    playNextTrack:(state) =>{
      if(state.playlistQueue.length >0) {
        const nextIndex = state.currentQueueIndex + 1;
        if( nextIndex < state.playlistQueue.length) {
          state.currentQueueIndex = nextIndex;
          state.currentTrack = state.playlistQueue[nextIndex];
        }
      }
    },
    playPreviousTrack:(state) => {
      if (state.playlistQueue.length > 0) {
        const prevIndex = state.currentQueueIndex -1;
        if( prevIndex >= 0) {
          state.currentQueueIndex = prevIndex;
          state.currentTrack = state.playlistQueue[prevIndex];
        }
      }
    },
    setSearchQuery:(state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    togglePlayPause:(state) => {
      state.isPlaying = !state.isPlaying
    },
    setIsPlaying:(state, action: PayloadAction<boolean>) =>{
      state.isPlaying = action.payload
    }
  }
})

export const { 
  setCurrentTrack,
  setPlaylistQueue,
  setCurrentQueueIndex,
  playNextTrack,
  playPreviousTrack,
  setSearchQuery,
  togglePlayPause,
  setIsPlaying,
} = playerSlice.actions