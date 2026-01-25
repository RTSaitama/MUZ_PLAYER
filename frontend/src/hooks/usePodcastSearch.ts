import { useSearchPodcastsByGenreQuery } from "@/redux/apis/itunesApi";
export const usePodcastSearch = (genreId:string) => {

  const { data: podcastsByGenre } = useSearchPodcastsByGenreQuery(genreId);
  
  // const filterByGenre = (genre: string) => {
  //   return podcastsByTerm?.filter(p => p.genres?.includes(genre)) || [];
  // };
  
  return {

    podcastsByGenre,
    // filterByGenre,
  };
};