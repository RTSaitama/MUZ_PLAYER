import { Footer } from "../components/Footer/Footer";
import { Hero } from "../components/Hero/Hero";
import { MusicScreen } from "../components/MusicScreen/MusicScreen";
import { SideMenu } from "../components/SideMenu/SideMenu";
import '../styles/main.scss'

function App() {
  return (
    <div className="App page__wrapper">
        <main className="main">
          <button className="open__menu__btn ">
            <svg className="burger__svg">
              {" "}
            <use href="/icons/sprite.svg#burger__icon" />
            </svg>
          </button>
          <SideMenu />
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
