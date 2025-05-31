import { useState } from "react";

import '../styles/main.scss'
import { SideMenu } from "../components/SideMenu/SideMenu";
import { MusicScreen } from "../components/MusicScreen/MusicScreen";
import { Hero } from "../components/Hero/Hero";
import { Footer } from "../components/Footer/Footer";

const App: React.FC = () => {
  const [menuMobile, setMenuMobile] = useState<boolean>(false);

  return (
    <div className="App page__wrapper">
      <main className="main">
        <button
          className="open__menu__btn "
          onClick={() => setMenuMobile(prev => !prev)}
        >
          <svg className="burger__svg">
            {" "}
            <use href="/icons/sprite.svg#burger__icon" />
          </svg>
        </button>
        <SideMenu mobile={menuMobile} />
        <div className="main__container container">
          <Hero />
          <MusicScreen />
        </div>
      </main>
      <Footer />

    </div>
  );
}

export default App;
