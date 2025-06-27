import { useState } from "react";
import '../styles/main.scss';
import { SideMenu } from "../components/SideMenu/SideMenu";
import { Footer } from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { PlayerProvider } from "../context/PlayerContext";
import { usePlayerContext } from '../context/PlayerContext';

// Створюємо окремий компонент для контенту
const AppContent: React.FC = () => {
  const [menuMobile, setMenuMobile] = useState(false);
  const { mediaIsRecording, playlistIsRecording } = usePlayerContext();

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
          <Outlet />
        </div>
      </main>
      <Footer 
        playlistIsRecording={playlistIsRecording} 
        trackIsRecording={mediaIsRecording} 
      />
    </div>
  );
};

// Головний компонент App тільки надає контекст
const App: React.FC = () => {
  return (
    <PlayerProvider>
      <AppContent />
    </PlayerProvider>
  );
};

export default App;