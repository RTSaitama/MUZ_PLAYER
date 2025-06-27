import { useEffect, useState } from "react";
import { Track, Album } from "../types/typedefs";
import { client } from "../api/fetchClient";

export const usePlayerController = () => {
  const [latestTracks, setLatestTracks] = useState<Track[]>([]);
  const [latestAlbums, setLatestAlbums] = useState<Album[]>([]);
  const [trackIsRecording, setTrackIsRecording] = useState<Track | null>(null);
  const [playlistIsRecording, setPlaylistIsRecording] = useState<Track[]>([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const onHandleSearch = () => {
    setSearch(query);
  };

  const onHandleQuery = () => {
    setQuery(query);
  };

 
  useEffect(() => {

    client.get<any>('topsongs/limit=20/json')
      .then(data => {
        const entries = data.feed.entry;
        const parsTracks: Track[] = entries.map((entry: any) => ({
          id: entry.id.attributes['im:id'],
          title: entry['im:name'].label,
          artist: entry['im:artist'].label,
          image: entry['im:image'][2].label,
          preview: entry.link.find((l: any) =>
            l.attributes?.type?.includes('audio')
          )?.attributes.href || '',
        }));
        setLatestTracks(parsTracks);
        setPlaylistIsRecording(parsTracks);
      })
      .catch(error => console.error('Помилка завантаження треків:', error));
  }, [search]);

 
  useEffect(() => {
    client.get<any>('topalbums/limit=20/json')
      .then(data => {
        const entries = data.feed.entry;
        const parsAlbums: Album[] = entries.map((entry: any) => ({
          id: entry.id.attributes['im:id'],
          title: entry['im:name'].label,
          artist: entry['im:artist'].label,
          image: entry['im:image'][2].label,
        }));
        setLatestAlbums(parsAlbums);

        // !!! Якщо хочеш тут зберігати альбом, треба змінити тип trackIsRecording на Album | null
        // setTrackIsRecording(parsAlbums[0]);
      })
      .catch(error => console.error('Помилка завантаження альбомів:', error));
  }, []);

  const handleTrackSelect = (track: Track) => {
    setTrackIsRecording(track);
  };

  return {
    latestTracks,
    latestAlbums,
    trackIsRecording,
    playlistIsRecording,
    search,
    query,
    setQuery,
    onHandleSearch,
    onHandleQuery,
    handleTrackSelect,
  };
};
