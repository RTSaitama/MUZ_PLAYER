import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetTopTracksQuery,
  useGetTopAlbumsQuery,
  useGetAlbumTracksQuery,
  useSearchTracksQuery,
} from '../store/apis/itunesApi';
import {
  setCurrentTrack,
  setPlaylistQueue,
  setCurrentQueueIndex,
  playNextTrack,
  playPreviousTrack,
  setSearchQuery,
  togglePlayPause,
  setIsPlaying,
} from '../store/slices/playerSlice';
import type { AppDispatch, RootState } from '../store/store';
import { Track, Album } from '../types/typedefs';

export const usePlayer = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>();
  const playerState = useSelector((state: RootState) => state.player);

  const { data: topTracks = [], isLoading: tracksLoading } = useGetTopTracksQuery();
  const { data: topAlbums = [], isLoading: albumsLoading } = useGetTopAlbumsQuery();
  const { data: searchResults = [], isFetching: searchResultsLoading } = useSearchTracksQuery(searchTerm, { skip: !searchTerm });
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);

  const { data: albumTracks = [], isFetching: tracksInProgress } = useGetAlbumTracksQuery(
    selectedAlbumId || '',
    { skip: !selectedAlbumId }
  );

  useEffect(() => {
    if (albumTracks.length > 0) {
      dispatch(setPlaylistQueue(albumTracks));
      dispatch(setCurrentTrack(albumTracks[0]));
      dispatch(setIsPlaying(true));
    }
  }, [albumTracks, dispatch]);

  const handleSelectTrack = (track: Track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setPlaylistQueue([track]));
  };

  const handleSelectAlbum = (album: Album) => {
    setSelectedAlbumId(album.id);
  };
  useEffect(() => {
    if (topTracks.length > 0 && !playerState.currentTrack) {
      dispatch(setCurrentTrack(topTracks[0]));
    }
  }, [topTracks, playerState.currentTrack, dispatch]);

const onHandleAddToPlaylist = (item: Track | Album) => {
  console.log('add button click');

  if ('preview' in item) {
      const isAlreadyInPlaylist = playerState.playlistQueue.some(t => t.id === item.id);
    if (!isAlreadyInPlaylist) {
      dispatch(setPlaylistQueue([...playerState.playlistQueue, item]));
    }
   } else if ('tracks' in item && Array.isArray(item.tracks)) {
      dispatch(setPlaylistQueue([...playerState.playlistQueue, ...item.tracks]));
     dispatch(setCurrentTrack(item.tracks[0]));
    dispatch(setCurrentQueueIndex(playerState.playlistQueue.length));  
  }
};
  return {
    currentTrack: playerState.currentTrack,
    playlistQueue: playerState.playlistQueue,
    currentQueueIndex: playerState.currentQueueIndex,
    searchQuery: playerState.searchQuery,
    isPlaying: playerState.isPlaying,
    topTracks,
    topAlbums,
    albumTracks,
    tracksLoading,
    albumsLoading,
    tracksInProgress,
    handleSelectTrack,
    handleSelectAlbum,
    setSelectedAlbumId,
    playNextTrack: () => dispatch(playNextTrack()),
    playPreviousTrack: () => dispatch(playPreviousTrack()),
    setCurrentQueueIndex: (index: number) => dispatch(setCurrentQueueIndex(index)),
    setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
    togglePlayPause: () => dispatch(togglePlayPause()),
    setIsPlaying: (isPlaying: boolean) => dispatch(setIsPlaying(isPlaying)),
    setPlaylistQueue: (tracks: Track[]) => dispatch(setPlaylistQueue(tracks)),
    searchResults,
    searchResultsLoading,
    setSearchTerm,
    searchTerm,
    onHandleAddToPlaylist
  };
};