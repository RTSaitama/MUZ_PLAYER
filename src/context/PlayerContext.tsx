import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Track, Album } from "../types/typedefs";
import { client } from "../api/fetchClient";
import { MediaItem } from "../types/typedefs";
 

interface PlayerContextType {
  latestTracks: Track[];
  latestAlbums: Album[];
  mediaIsRecording: MediaItem | null;
  playlistIsRecording: Track[];
  search: string;
  query: string;
  setQuery: (query: string) => void;
  onHandleSearch: () => void;
  onHandleQuery: () => void;
  setSelectedTrack: (track: Track) => void;
  setSelectedAlbum: (album: Album) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [latestTracks, setLatestTracks] = useState<Track[]>([]);
  const [latestAlbums, setLatestAlbums] = useState<Album[]>([]);
  const [mediaIsRecording, setMediaIsRecording] = useState<MediaItem | null>(null);
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

        // Тепер можна зберігати альбом
        // setMediaIsRecording(parsAlbums[0]);
      })
      .catch(error => console.error('Помилка завантаження альбомів:', error));
  }, []);

  const setSelectedTrack = (track: Track) => {
    setMediaIsRecording(track);
  };

  const setSelectedAlbum = (album: Album) => {
    setMediaIsRecording(album);
  };

  const value: PlayerContextType = {
    latestTracks,
    latestAlbums,
    mediaIsRecording,
    playlistIsRecording,
    search,
    query,
    setQuery,
    onHandleSearch,
    onHandleQuery,
    setSelectedTrack,
    setSelectedAlbum,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};