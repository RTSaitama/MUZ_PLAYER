import { PODCAST_GENRES, MUSIC_GENRES } from "@/constants/constants";
import { usePodcastSearch } from "@/hooks/usePodcastSearch";
import { useTrackSearch } from "@/hooks/useTrackSearch";
import type { PodcastGenre, MusicGenre, GenreSearchResults, Podcast, Track } from "@/types/typedefs";
import { useMemo } from "react";

export const GenresPage = () => {
  const { podcastsByGenre, searchPodcastByGenre, resetPodcastSearchByGenre } = usePodcastSearch();
  const { tracksByGenre, searchTrackByGenre, resetTrackSearchByGenre } = useTrackSearch();

  const itemsToShow = useMemo(() => {
    if (podcastsByGenre && podcastsByGenre.length > 0) {
      return podcastsByGenre;
    }
    if (tracksByGenre && tracksByGenre.length > 0) {
      return tracksByGenre;
    }
    return null;
  }, [podcastsByGenre, tracksByGenre]);

  const onHandleResetResults = () => {
    resetPodcastSearchByGenre();
    resetTrackSearchByGenre();
  };

  const onHandleSetSearchResults = (type: GenreSearchResults, genreID: string) => {
    if (type === 'podcast') {
      searchPodcastByGenre(genreID.toString());
    } else if (type === 'music') {
      searchTrackByGenre(genreID.toString());
    }
  };

  return (
    <div className='pages__wrapper genres_page__wrapper'>
      {itemsToShow && itemsToShow.length > 0 ?
        (
          <>
            <button className="back-to-genres__btn" onClick={onHandleResetResults}>
              <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 38L6 21L23 4" stroke="#d36a19ff" stroke-width="8"   />
              </svg>
              go back </button>
            <ul className="genres__search-list">
              {itemsToShow?.map((item: Podcast | Track) => {
                const isPodcast = 'name' in item;
                const isTrack = 'title' in item;

                if (isPodcast) {
                  return (
                    <li key={item.id} className="genres__search-item">
                      <img src={item.artwork} alt={item.name} className="genres__search-item-image" />
                      <p className="genres__search-item-title">{item.name}</p>
                    </li>
                  );
                }

                if (isTrack) {
                  return (
                    <li key={item.id} className="genres__search-item">
                      <img src={item.image} alt={item.title} className="genres__search-item-image" />
                      <p className="genres__search-item-title">{item.title}</p>
                      <p className="genres__search-item-artist">{item.artist}</p>
                    </li>
                  );
                }

                return null;
              })}
            </ul>
          </>
        ) :
        (
          <>
            <div className="genres__category-wrapper podcasts_genres">
              <h3 className="genres__list-title">Podcasts genres</h3>
              <ul className="genres__list">
                {PODCAST_GENRES.map((genre: PodcastGenre) => {
                  return (
                    <li
                      onClick={() => onHandleSetSearchResults('podcast', genre.id.toString())}
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
                      onClick={() => onHandleSetSearchResults('music', genre.id.toString())}
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