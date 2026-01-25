import { useSearchTracksByGenreQuery } from "@/redux/apis/itunesApi";

export const useTrackSearch = ( genreId:string ) => {
  const { data: tracksByGenre } = useSearchTracksByGenreQuery(genreId);
  
  // const filterByGenre = (genre: string) => {
  //   return tracksByGenre?.filter(music => music.genres?.includes(genre)) || [];
  // };
  
  return {
    tracksByGenre,
    // filterByGenre,
  };
};