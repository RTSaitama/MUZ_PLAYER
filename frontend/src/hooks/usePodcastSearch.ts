import { useLazySearchPodcastsByGenreQuery } from "@/redux/apis/itunesApi";

export const usePodcastSearch = () => {
   const [trigger, { data: podcastsByGenre, reset }] = useLazySearchPodcastsByGenreQuery();
  
   const searchPodcastByGenre = (genreId: string) => {
    trigger(genreId);
  };
  // const filterByGenre = (genre: string) => {
  //   return podcastsByTerm?.filter(p => p.genres?.includes(genre)) || [];
  // };
  const resetPodcastSearchByGenre = () => {
    reset();
  };
  
  return {
    podcastsByGenre,
    searchPodcastByGenre,
    resetPodcastSearchByGenre,
    // filterByGenre,
  };
};