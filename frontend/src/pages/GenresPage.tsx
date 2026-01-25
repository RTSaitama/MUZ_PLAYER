import { PODCAST_GENRES, MUSIC_GENRES } from "@/constants/constants";
import type { PodcastGenre, MusicGenre } from "@/types/typedefs";
// import { usePodcastSearch } from "@/hooks/usePodcastSearch";
// import { useTrackSearch } from "@/hooks/useTrackSearch";
export const GenresPage = () => {
  // const onHandleSetGenre = () => {

  // }
  // const {podcastsByGenre} = usePodcastSearch(onHandleSetGenre(genre.id));
  // const {tracksByGenre} = useTrackSearch();
  return (
    <div className='pages__wrapper genres_page__wrapper'>
      <div className="genres__category-wrapper podcasts_genres">
        <h3 className="genres__list-title">Podcasts genres</h3>
        <ul className="genres__list">
          {PODCAST_GENRES.map((genre: PodcastGenre) =>
            <li key={ genre.id} 
            className="genres__list-item"
            // onClick={()=>onHandleSetGenre(genre.id)}
            >
              {genre.name}
            </li>)}
        </ul>
      </div>
          <div className="genres__category-wrapper music_genres">
            <h3 className="genres__list-title">Music Genres</h3>
        <ul className="genres__list music_genres-list">
          {MUSIC_GENRES.map((genre: MusicGenre) =>
            <li key={ genre.id} className="genres__list-item">
              {genre.name}
            </li>)}
        </ul>
      </div>

    </div>
  )
}