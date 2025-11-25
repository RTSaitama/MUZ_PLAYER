import { useEffect, useState } from "react";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { usePlayer } from "../../hooks/usePlayer";
import { motion } from 'framer-motion';

export const Hero = () => {
  const { searchTerm, setSearchTerm, searchResults, searchResultsLoading, handleSelectTrack } = usePlayer();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  useEffect(() =>{
    const searchTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);
    return () => clearTimeout(searchTimer);
  },[searchTerm])
  const containerVar = {
    hidden: { opacity: 0.1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVar = {
    hidden: { opacity: 0.1 },
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };


  return (
    <div className="hero__screen container">
      <div className="hero__screen__search__wrapper">
        <button
          className="hero__screen__btn__search"
        // onClick={search}
        ><SearchIcon width={20} height={20} /></button>
        <input
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={'Let\'s find something true'}
          type="text"
          className="hero__screen_search_input search_inp"

        />
      </div>
      {debouncedSearchTerm 
        ?

        searchResultsLoading ?
          (
            <div>in 1 moment from track you search....</div>
          )
          : (

            <motion.ul
              variants={containerVar}
              key={searchResults.length}
              initial="hidden"
              animate="visible"
              className="search__results__screen" >{searchResults.map((track, index) => (
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
        :
        (
          <>


            <h2 className="hero__screen__heading">WHAT’S NEW?</h2>
            <p className="hero__screen__subheading">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed
              pellentesque odio, nec iaculis turpis. Praesent convallis est vitae
              auctor consequat. Aliquam pretium suscipit facilisis. Cras ornare
              ligula nulla, non fringilla lacus tincidunt in. Aenean mattis id dui
              sed semper.
            </p>
            <button className="hero__screen__btn btn__start btn">Start</button>  </>)
      }
    </div>

  )
}
