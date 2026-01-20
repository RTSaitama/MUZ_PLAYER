// import { useState } from "react";
import '../styles/main.scss';
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Footer } from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ModalPlaylist } from "../components/ModalPlaylists/ModalPlaylists";
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/Forms/LoginForm/LoginForm';

export const App: React.FC = () => {
  // const [menuMobile, setMenuMobile] = useState(false);
  
    const { isAuthenticated, accessToken  } = useAuth();
 console.log('isAuthenticated:', isAuthenticated);
  console.log('accessToken:', accessToken);
  if (!isAuthenticated) {
    return <LoginForm />;
  }
  return (
    <div className="App page__wrapper">
      <main className="main">
        {/* <button
          className="open__menu__btn"
          onClick={() => setMenuMobile(prev => !prev)}
        >
          <svg className="burger__svg">
            <use href="/icons/sprite.svg#burger__icon" />
          </svg> 
         </button> */}
        <Sidebar  />
        <div className="main__container">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ModalPlaylist />
    </div>
  );
};
