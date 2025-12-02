import { useGetPlaylistsQuery } from '../store/apis/playlistsApi';
import clsx from "clsx";
import { motion, AnimatePresence } from 'framer-motion';

import { usePlayer } from '../hooks/usePlayer';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { useState, useEffect } from 'react';

export const PlaylistsPage = () => {
  const { data: playlists, isLoading, error } = useGetPlaylistsQuery();
  const { searchTerm, setSearchTerm, searchResults, searchResultsLoading, handleSelectTrack } = usePlayer();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 700);
    return () => clearTimeout(searchTimer);
  }, [searchTerm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading playlist</div>;
  }

  const containerVar = {
    hidden: { opacity: 0.1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, duration: 0.5 } },
  };

  const itemVar = {
    hidden: { opacity: 0.1 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.5 } },
  };

  return (
    <div className="pages__wrapper">
      <div className="playlists__search__wrapper">
        <button className="playlists__screen__btn__search">
          <SearchIcon width={20} height={20} />
        </button>
        <input
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={"Let's find something true"}
          type="text"
          className="playlists__screen_search_input search_inp"
        />
      </div>

      <AnimatePresence mode="wait">
        {debouncedSearchTerm ? (
          searchResultsLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, animationDuration:0.8 }}
            >
              in 1 moment from track you search....
            </motion.div>
          ) : (
            <motion.ul
              key="results"
              variants={containerVar}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="search__results__screen playlists_screen"
            >
              {searchResults.map((track) => (
                <motion.li
                  variants={itemVar}
                  key={track.id}
                  className="search__results__item playlist_item"
                  onClick={() => handleSelectTrack(track)}
                >
                  <img
                    className="playlist_img"
                    src={track.image}
                    alt="track image"
                  />
                </motion.li>
              ))}
            </motion.ul>
          )
        ) : (
          <motion.ul className="playlists__list users__playlists_list">
            {playlists?.map((playlist) => {
              console.log(playlist.tracks)
              return(
              <motion.li
                key={playlist.id}
                className="playlists__list__item"
                variants={itemVar}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <img
                  src={playlist.tracks?.[0]?.image}
                  className={clsx("playlist__list__item_img", {
                    "playlist_bg": playlist.tracks?.[0]?.image,
                    "playlist_no_bg": !playlist.tracks?.[0]?.image,
                  })}
                  alt="playlist cover"
                />
                <p className="playlist__track">{playlist.name}, length =  {playlist.tracks.length}</p>
              
              </motion.li>
            )})}
          </motion.ul>)}
        
      </AnimatePresence>
    </div>
  );
};
