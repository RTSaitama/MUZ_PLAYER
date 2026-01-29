import { useEffect, useState } from "react";
import { usePlayer } from "../../hooks/usePlayer";
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { Search } from "../Search/Search";
export const Hero = () => {
  const { t } = useTranslation();
  const { searchTerm, searchResults, setSearchTerm, searchResultsLoading, handleSelectTrack } = usePlayer();
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
      <Search setSearchTerm={setSearchTerm} />

      <AnimatePresence mode="wait">
        {debouncedSearchTerm ? (
          searchResultsLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
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
              "In the words of AC/DC: We roll tonight -- to the guitar bite -- and for those about to rock -- I salute you."
            </p>
            <button className="hero__screen__btn btn__start btn">Start</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};