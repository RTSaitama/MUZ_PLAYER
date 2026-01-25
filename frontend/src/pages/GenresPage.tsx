import { PODCAST_GENRES, MUSIC_GENRES } from "@/constants/constants";
import { usePodcastSearch } from "@/hooks/usePodcastSearch";
import { useTrackSearch } from "@/hooks/useTrackSearch";
import type { PodcastGenre, MusicGenre, } from "@/types/typedefs";

export const GenresPage = () => {
  const {podcastsByGenre, searchPodcastByGenre, resetPodcastSearchByGenre} = usePodcastSearch();
  const {tracksByGenre, searchTrackByGenre, resetTrackSearchByGenre} = useTrackSearch();
  const onHandleResetSearchByGenre = () => {
    resetPodcastSearchByGenre();
    resetTrackSearchByGenre();
  };
  
  return (
    <div className='pages__wrapper genres_page__wrapper'>
      {podcastsByGenre  || tracksByGenre ? 
        (
      
         <button onClick={onHandleResetSearchByGenre}>Clear</button>

      ) : 
      (
        <>
          <div className="genres__category-wrapper podcasts_genres">
            <h3 className="genres__list-title">Podcasts genres</h3>
            <ul className="genres__list">
              {PODCAST_GENRES.map((genre: PodcastGenre) => {
                return (
                  <li 
                    onClick={() => searchPodcastByGenre(genre.id.toString())}
                    key={genre.id} 
                    className="genres__list-item"
                  >
                    {genre.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="genres__category-wrapper music_genres">
            <h3 className="genres__list-title">Music Genres</h3>
            <ul className="genres__list music_genres-list">
              {MUSIC_GENRES.map((genre: MusicGenre) => {
                return (
                  <li 
                    onClick={() => searchTrackByGenre(genre.id.toString())}
                    key={genre.id} 
                    className="genres__list-item"
                  >
                    {genre.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )
    
      }
    </div>
  );
}