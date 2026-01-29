import { useGetPlaylistsQuery } from '../redux/apis/playlistsApi';
import { motion, AnimatePresence } from 'framer-motion';
import playlistLogo from '../assets/images/playlist__logo.png'
import { usePlayer } from '../hooks/usePlayer';
import { useAuth } from '@/hooks/useAuth';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthRequiredPage } from './AuthRequiredPage';
import { useDispatch } from 'react-redux';
import { toggleModalNewPlaylist } from '@/redux/slices/modalStatusSlice';
 

export const PlaylistsPage = () => {
  const { data: playlists, isLoading, error } = useGetPlaylistsQuery();
  const { searchTerm, setSearchTerm, searchResults, searchResultsLoading, handleSelectTrack } = usePlayer();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const dispatch = useDispatch();
  const createNewPlaylist = () => dispatch(toggleModalNewPlaylist())

  const { isAuthenticated } = useAuth();
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
    if(!isAuthenticated) return  <AuthRequiredPage/>
    return <div>Error loading playlist</div>;
  }

  const containerVar = {
    hidden: { opacity: 0.1},
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, duration: 0.05 } },
  };

  const itemVar = {
    hidden: { opacity: 0.1 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.5 } },
  };
 
  return (
    <div className="pages__wrapper playlists_page__wrapper">
      <div className="playlists__search__wrapper">
        <input
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={"Let's find something true"}
          type="text"
          className="playlists__screen_search_input search_inp"
        />
            <button className="playlists__screen__btn__search">
          <SearchIcon width={20} height={20} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {debouncedSearchTerm ? (
          searchResultsLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, animationDuration: 0.8 }}
            >
              in 1 moment from tracks you search
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
                   <motion.li
                  onClick={createNewPlaylist}
                  className="createNewPlaylist_btn "
                  variants={itemVar}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={999}
                >
                  <button className='new-playlist_btn' >
                    <p className="  new-playlist-btn_name">manage playlists</p>
                  </button>
              
                </motion.li>
            {playlists?.map((playlist) => {
              console.log(playlist.tracks)
              const preparedAlbumLink = `/playlists/${playlist.id}`;
              const preparedPlaylistName = `${playlist.name.slice(0,18)}...`
              return (

                <motion.li
                  className="playlists__list__item"
                  variants={itemVar}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={playlist.id}
                >
                  <NavLink to={preparedAlbumLink} >
                    <img
                      src={playlist.tracks?.[0]?.image || playlistLogo}
                      className="playlist__list__item_img"
                      alt="playlist cover"
                    />
                    <p className="playlist__track_name">{preparedPlaylistName}</p>
                  </NavLink>
                </motion.li>

              )
            })}
         
          </motion.ul>)}  

      </AnimatePresence>
    </div>
  );
};
