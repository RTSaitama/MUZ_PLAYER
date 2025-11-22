 import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Hero } from '../components/Hero/Hero';
import { MusicScreen } from '../components/MusicScreen/MusicScreen';

export const HomePage: React.FC = () => {
  const player = useOutletContext<any>();

  return (
    <>
      <Hero
 
      />
      <MusicScreen
 
      />
    </>
  );
};