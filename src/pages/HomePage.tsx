// src/pages/HomePage.tsx
import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { MusicScreen } from '../components/MusicScreen/MusicScreen';
import { usePlayerContext } from '../context/PlayerContext';

export const HomePage: React.FC = () => {
  const { 
    query,
    setQuery,
    onHandleSearch,
    latestTracks, 
    latestAlbums, 
    setSelectedTrack 
  } = usePlayerContext();

  return (
    <>
      <Hero
        query={query}
        setQuery={setQuery}
        search={onHandleSearch}
      />
      <MusicScreen
        tracks={latestTracks}
        albums={latestAlbums}
        onTrackSelect={setSelectedTrack}
      />
    </>
  );
};