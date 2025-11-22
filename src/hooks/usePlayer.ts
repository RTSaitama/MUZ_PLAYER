import { useDispatch, useSelector } from "react-redux";
import { 
  useGetTopTracksQuery,
  useGetTopAlbumsQuery,
  useGetAlbumTracksQuery,

} from "../store/apis/itunesApi";
import {
  setCurrentTrack,
  setPlaylistQueue,
  setCurrentQueueIndex,
  playNextTrack,
  playPreviousTrack,
  setSearchQuery,
  togglePlayPause,
  setIsPlaying,
} from '../store/slices/playerSlice'
import type { AppDispatch, RootState } from "../store/store";
import { Track, Album } from "../types/typedefs";

export const usePlayer = () =>{

  const dispatch = useDispatch<AppDispatch>();
  const playerState = useSelector((state:RootState) =>state.player)
  
  const { data: topTracks = [], isLoading: tracksLoading } = useGetTopTracksQuery();
  const { data: topAlbums = [], isLoading: albumsLoading } = useGetTopAlbumsQuery();
  const { data: albumTracks = [], isFetching: tracksInProgress } = useGetAlbumTracksQuery(
    playerState.currentTrack?.albumId || '',
    { skip: !playerState.currentTrack?.albumId }
  );
  const handleSelectTrack  = (track: Track) => {
    dispatch(setCurrentTrack(track));
  }

  const handleSelectAlbum = async (album: Album) => {
     const tracks = await useGetAlbumTracksQuery(album.id);
     if(tracks.data) {
      dispatch(setPlaylistQueue(tracks.data))
     }
  }
    return {
 
    currentTrack: playerState.currentTrack,
    playlistQueue: playerState.playlistQueue,
    currentQueueIndex: playerState.currentQueueIndex,
    searchQuery: playerState.searchQuery,
    isPlaying: playerState.isPlaying,
    topTracks,
    topAlbums,


    tracksLoading,
    albumsLoading,
    tracksInProgress,

    handleSelectTrack,
    handleSelectAlbum,
    playNextTrack: () => dispatch(playNextTrack()),
    playPreviousTrack: () => dispatch(playPreviousTrack()),
    setCurrentQueueIndex: (index: number) => dispatch(setCurrentQueueIndex(index)),
    setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
    togglePlayPause: () => dispatch(togglePlayPause()),
    setIsPlaying: (isPlaying: boolean) => dispatch(setIsPlaying(isPlaying)),
    setPlaylistQueue: (tracks: Track[]) => dispatch(setPlaylistQueue(tracks)),
  };
}