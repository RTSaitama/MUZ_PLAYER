 import { useState } from "react";
import '../styles/main.scss';
import { SideMenu } from "../components/SideMenu/SideMenu";
import { Footer } from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";




const AppContent: React.FC = () => {
  const [menuMobile, setMenuMobile] = useState(false);

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
          <Outlet  />
        </div>
      </main>
      <Footer 
 
      />
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;