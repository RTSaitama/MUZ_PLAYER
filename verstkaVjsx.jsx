<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="././src/styles/main.css" />
  <title>Document</title>
  <div className="page__wrapper">
    <main className="main">
      <button className="open__menu__btn ">
        <svg className="burger__svg">
          {" "}
          <use xlinkHref="./muzplayer/src/assets/icons/sprite.svg#burger__icon" />
        </svg>
      </button>
      {/* #region Side menu */}
      <aside className="side__menu navigation ">
        <nav className=" browse__bar bar">
          <ul className="bar__list">
            <li className="bar__li">
              <div className="bar__li__icon">
                <svg className="bar__svg ">
                  {" "}
                  <use xlinkHref="./src/assets/icons/sprite.svg#discover__icon" />
                </svg>
              </div>
              <p className="bar__li__name">discover</p>
            </li>
            <li className="bar__li">
              <div className="bar__li__icon">
                <svg className="bar__svg">
                  {" "}
                  <use xlinkHref="./src/assets/icons/sprite.svg#genre__icon" />
                </svg>
              </div>
              <p className="bar__li__name">genre</p>
            </li>
            <li className="bar__li">
              <div className="bar__li__icon">
                <svg className="bar__svg">
                  {" "}
                  <use xlinkHref="./src/assets/icons/sprite.svg#top_charts__icon" />
                </svg>
              </div>
              <p className="bar__li__name">top charts</p>
            </li>
            <li className="bar__li">
              <div className="bar__li__icon">
                <svg className="bar__svg">
                  {" "}
                  <use xlinkHref="./src/assets/icons/sprite.svg#podcast__icon" />
                </svg>
              </div>
              <p className="bar__li__name">podcast</p>
            </li>
          </ul>
        </nav>
        <div className="library__bar bar">
          <h3 className="bar__heading">library</h3>
          <ul className="bar__list">
            <li className="bar__li">
              <div className="bar__li__icon">
                <svg className="bar__svg">
                  <use xlinkHref="./muzplayer/src/assets/icons/sprite.svg#favourites__icon" />
                </svg>
              </div>
              <p className="bar__li__name">favourites</p>
            </li>
            <li className="bar__li">
              <div className="bar__li__icon">
                <svg
                  className="bar__svg"
                  width={36}
                  height={36}
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.5 11.5V3H15C10.7574 3 8.63604 3 7.31802 4.31802C6 5.63604 6 7.75736 6 12V24C6 28.2426 6 30.364 7.31802 31.682C8.63604 33 10.7574 33 15 33H21C25.2426 33 27.364 33 28.682 31.682C30 30.364 30 28.2426 30 24V14.5H21.5L21.4456 14.5H21.4456H21.4456C21.0215 14.5001 20.6094 14.5002 20.2695 14.4545C19.8863 14.403 19.449 14.2774 19.0858 13.9142C18.7226 13.551 18.597 13.1137 18.5455 12.7305C18.4998 12.3906 18.4999 11.9785 18.5 11.5544V11.5544V11.5544L18.5 11.5ZM20.5 11.5V3.00065C21.4132 3.00457 21.9321 3.03231 22.4054 3.22836C22.9567 3.45672 23.3903 3.89027 24.2574 4.75736L28.2426 8.74264C29.1097 9.60973 29.5433 10.0433 29.7716 10.5946C29.9677 11.0679 29.9954 11.5868 29.9994 12.5H21.5C21.0003 12.5 20.7262 12.4979 20.536 12.4723L20.5287 12.4713L20.5277 12.464C20.5021 12.2738 20.5 11.9997 20.5 11.5ZM16.2565 18.1858L21.5012 20.7632C22.8329 21.4176 22.8329 23.5824 21.5012 24.2368L16.2565 26.8142C14.9516 27.4555 13.5 26.3579 13.5 24.73V20.27C13.5 18.6421 14.9516 17.5445 16.2565 18.1858Z"
                    fill="white"
                  />
                </svg>
              </div>
              <p className="bar__li__name">playlist</p>
            </li>
          </ul>
        </div>
      </aside>
      {/* #endregion */}
      {/* #region main container */}
      <div className="main__container container">
        {/* #region Hero screen */}
        <div className="hero__screen container">
          {/* #region search */}
          <div className="hero__screen__search__wrapper">
            {/* <svg class="hero__screen_search__svg search__svg"><use xlink:href="./muzplayer/src/assets/icons/sprite.svg#search__icon"></use>></svg> */}
            <button className="hero__screen__btn__search" />
            <input
              type="text"
              className="hero__screen_search_input search_inp"
            />
          </div>
          {/* endregion */}
          {/* #region Heading */}
          <h2 className="hero__screen__heading">WHAT’S NEW?</h2>
          <p className="hero__screen__subheading">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed
            pellentesque odio, nec iaculis turpis. Praesent convallis est vitae
            auctor consequat. Aliquam pretium suscipit facilisis. Cras ornare
            ligula nulla, non fringilla lacus tincidunt in. Aenean mattis id dui
            sed semper.
          </p>
          {/* #endregion */}
          <button className="hero__screen__btn btn__start btn">Start</button>
        </div>
        {/* #endregion */}
        {/* #region Music screen */}
        <div className="music__screen container">
          <div className="swiper__wrapper music__screen__part">
            <h3 className="music__screen__heading">top album</h3>
            <div className="swiper">
              <button className="swiper__arrow arrow__prev" />
              <ul className="music__list">
                <li className="music__pictures" />
                <li className="music__pictures" />
                <li className="music__pictures" />
                <li className="music__pictures" />
                <li className="music__pictures" />
              </ul>
              <button className="swiper__arrow arrow__next" />
            </div>
          </div>
          <div className="latest__music container music__screen__part">
            <div className="latest__album latest__music__part">
              <h3 className="latest__heading">latest album</h3>
              <ul className="latest__list">
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="latest__singles latest__music__part">
              <h3 className="latest__heading">latest sings </h3>
              <ul className="latest__list">
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>{" "}
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>{" "}
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>{" "}
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>{" "}
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>{" "}
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>{" "}
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>{" "}
                <li className="latest__li">
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src="./muzplayer/src/assets/images/latest demo look/gorillaz track picture.jpg"
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">Feel Good Inc.</p>
                      <p className="track__artist">Gorillaz</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* #endregion  */}
      </div>
      {/* endregion */}
    </main>
    {/* #region Footer */}
    <footer className="footer">
      <div className="footer__player__wrapper">
        <div className="footer__player__track">
          <div className="footer__player__track__icon"></div>
          <div className="footer__player__track__name">
            <div className="footer__player__track__name">
              Death Grips is Online
            </div>
            <div className="footer__player__track__artist">Death Grips</div>
          </div>
        </div>
        <div className="footer__player__controls__wrapper">
          <button className="footer__player__btn btn back__btn" />
          <button className="footer__player__btn btn play__btn" />
          <button className="footer__player__btn btn next__btn" />
        </div>
        <div className="footer__player__duration__wrapper"></div>
      </div>
    </footer>
    {/* #endregion */}
  </div>
</>
