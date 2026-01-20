import { usePlayer } from '../../hooks/usePlayer';
import { AdditemBtn } from '../Buttons/Additem/AdditemBtn';
import { ItemSettingsBtn } from '../Buttons/ItemSettings/ItemSettingsBtn';
import { SwiperScreen } from '../Swiper/SwiperScreen';
import { ItemOrder } from '../ItemOrder/ItemOrder';
import { useTranslation } from 'react-i18next';
export const MusicScreen = () => {
  const { t } = useTranslation();
  
  const {
    topTracks,
    topAlbums,
    handleSelectTrack,
    handleSelectAlbum,
    tracksLoading,
    albumsLoading,
  } = usePlayer();

  return (
    <div className="music__screen container">
      <SwiperScreen />
      <div className="latest__music container music__screen__part">
        {/* АЛЬБОМИ */}
        <div className="latest__album latest__music__part">
          <h3 className="latest__heading">{t('latest albums')}</h3>
          <ul className="latest__list">
            {albumsLoading ? (
              <p>Завантаження альбомів</p>
            ) : topAlbums.length > 0 ? (
              topAlbums.map((album, index) => {
                const preparedTitle = `${album.title.slice(0, 20)}...`
                return (<li
                  className="latest__li"
                  key={album.id}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="item__wrapp"
                    onClick={() => handleSelectAlbum(album)}
                  >
                    <img
                      className="item__img"
                      src={album.image}
                      alt="album"
                    />
                    <div className="item__info">
                      <p className="item__name">{preparedTitle}</p>
                      <p className="item__artist">{album.artist}</p>
                    </div>
                  </div>
                  <div className='item__options'>
                    <ItemSettingsBtn />
                    <ItemOrder index={index} />
                    <AdditemBtn mediaItem={album}/>
                  </div>
                </li>)
              }

              )
            ) : (
              <p>Немає альбомів</p>
            )}
          </ul>
        </div>

        {/* ТРЕКИ */}
        <div className="latest__singles latest__music__part">
          <h3 className="latest__heading">{t('latest songs')}</h3>
          <ul className="latest__list">
            {tracksLoading ? (
              <p>Завантаження треків</p>
            ) : topTracks.length > 0 ? (
              topTracks.map((track, index) => {
                const preparedTitle = `${track.title.slice(0, 20)}...`
                return (
                  <li
                    className="latest__li"
                    key={track.id}
                    onClick={() => handleSelectTrack(track)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="item__wrapp">
                      <img
                        className="item__img"
                        src={track.image}
                        alt="track"
                      />
                      <div className="item__info">
                        <p className="item__name">{preparedTitle}</p>
                        <p className="item__artist">{track.artist}</p>
                      </div>                  
                    </div>
                     <div className='item__options'>
                        <ItemSettingsBtn />
                        <ItemOrder index={index} />
                        <AdditemBtn  mediaItem={track}/>
                      </div>
                  </li>
                )
              })
            ) : (
              <p>Немає треків</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};