import { useLazySearchTracksByGenreQuery } from "@/redux/apis/itunesApi";

export const useTrackSearch = () => {
  const [trigger, { data: tracksByGenre, reset}] = useLazySearchTracksByGenreQuery();
  
  const searchTrackByGenre = (genreId: string) => {
    trigger(genreId);
  };
    const resetTrackSearchByGenre = () => {
    reset();
  };
  return {
    tracksByGenre,
    searchTrackByGenre,
    resetTrackSearchByGenre,
  };
};