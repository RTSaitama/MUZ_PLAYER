import { useState, useEffect } from "react";
import '../styles/main.scss';
import { SideMenu } from "../components/SideMenu/SideMenu";
import { MusicScreen } from "../components/MusicScreen/MusicScreen";
import { Hero } from "../components/Hero/Hero";
import { Footer } from "../components/Footer/Footer";


export interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  image: string;
}

const App: React.FC = () => {
  const [menuMobile, setMenuMobile] = useState(false);
  const [latestTracks, setLatestTracks] = useState<Track[]>([]);
  const [latestAlbums, setLatestAlbums] = useState<Track[]>([]);
  const [trackIsRecording, setTrackIsRecording] = useState<Track | null>(latestTracks[0] || null);
  const [playlistIsRecording, setPlaylistIsRecording] = useState<Track[]>(latestAlbums);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const onHandleSearch = () => {
    setSearch(query)
  }

  const onHandleQuery = () => {
    setQuery(query)
  }

  const handleTrackSelect = (track: Track) => {
    setTrackIsRecording(track);
  };
  // Беремо Трекліст та Альбомліст
  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/topsongs/limit=20/json')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const entries = data.feed.entry;
        const parsTracks: Track[] = entries.map((entry: any) => ({
          id: entry.id.attributes['im:id'],
          title: entry['im:name'].label,
          artist: entry['im:artist'].label,
          image: entry['im:image'][2].label,
        }));
        setLatestTracks(parsTracks);
        setPlaylistIsRecording(parsTracks)
      })
      .catch(error => console.error('Помилка:', error));
  }, []);
  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=20/json')
      .then(response => response.json())
      .then(data => {
        const entries = data.feed.entry;
        const parsAlbums: Album[] = entries.map((entry: any) => ({
          id: entry.id.attributes['im:id'],
          title: entry['im:name'].label,
          artist: entry['im:artist'].label,
          image: entry['im:image'][2].label,
        }));
        setLatestAlbums(parsAlbums);
        setTrackIsRecording(parsAlbums[0])

      })
      .catch(error => console.error('Помилка:', error));
  }, []);
  // 

  return (
    <div className="App page__wrapper">
      <main className="main">
        <button
          className="open__menu__btn"
          onClick={() => setMenuMobile(prev => !prev)}
        >
          <svg className="burger__svg">
            <use href="/icons/sprite.svg#burger__icon" />
          </svg>
        </button>
        <SideMenu mobile={menuMobile} />
        <div className="main__container container">
          <Hero
            query={query}
            setQuery={value => setQuery(value)}
            search={onHandleSearch}
             
          />
          <MusicScreen tracks={latestTracks} albums={latestAlbums} onTrackSelect={handleTrackSelect} />
        </div>
      </main>
      <Footer playlistIsRecording={playlistIsRecording} trackIsRecording={trackIsRecording} />
    </div>
  );
};

export default App;
