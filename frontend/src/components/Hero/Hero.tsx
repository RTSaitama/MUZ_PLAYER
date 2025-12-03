import { useEffect, useState } from "react";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { usePlayer } from "../../hooks/usePlayer";
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
export const Hero = () => {
  const { t } = useTranslation();
  const { searchTerm, setSearchTerm, searchResults, searchResultsLoading, handleSelectTrack } = usePlayer();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  useEffect(() => {
    const searchTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 700);
    return () => clearTimeout(searchTimer);
  }, [searchTerm]);

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
  };

  return (
    <div className="hero__screen container">
      <div className="hero__screen__search__wrapper">
        <button className="hero__screen__btn__search">
          <SearchIcon width={20} height={20} />
        </button>
        <input
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={"Let's find something true"}
          type="text"
          className="hero__screen_search_input search_inp"
        />
      </div>

      <AnimatePresence mode="wait">
        {debouncedSearchTerm ? (
          searchResultsLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              in 1 moment from track you search....
            </motion.div>
          ) : (
            <motion.ul
              key="results"
              variants={containerVar}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="search__results__screen"
            >
              {searchResults.map((track) => (
                <motion.li
                  variants={itemVar}
                  onClick={() => handleSelectTrack(track)}
                  key={track.id}
                  className="search__results__item"
                >
                  <img src={track.image} alt="track image" />
                </motion.li>
              ))}
            </motion.ul>
          )
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="hero__screen__heading">{t('HERO HEADING')}</h2>
            <p className="hero__screen__subheading">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <button className="hero__screen__btn btn__start btn">Start</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};