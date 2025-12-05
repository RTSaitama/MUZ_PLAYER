import { motion,   } from 'framer-motion';
import { useGetPlaylistsQuery } from '../../store/apis/playlistsApi';
export const Playlists = () => {
  const {
    data: playlists,
    // isFetching = playlistsAreFetching,
    //  isLoading = playlistsAreLoading
  } = useGetPlaylistsQuery();

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
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.7 } },
  }
console.log(playlists);
  return (
      <motion.ul
        key="results"
        variants={containerVar}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="search__results__screen playlists_screen"
      >
        {playlists?.map((playlist) => (
          <motion.li
            variants={itemVar}
            key={playlist.id}
            className="search__results__item playlist_item"
          >
            {playlist.tracks?.length>0 && <img className='playlist_img' src={playlist.tracks[0].image} alt="first track of playlist image" />}
          </motion.li>
        ))}
      </motion.ul>
  )
}

