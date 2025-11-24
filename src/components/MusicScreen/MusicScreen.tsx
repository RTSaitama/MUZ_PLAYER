 import { usePlayer } from '../../hooks/usePlayer';
import { SwiperScreen } from '../Swiper/SwiperScreen';

export const MusicScreen = () => {
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
          <h3 className="latest__heading">latest album</h3>
          <ul className="latest__list">
            {albumsLoading ? (
              <p>Завантаження альбомів</p>
            ) : topAlbums.length > 0 ? (
              topAlbums.map((album) => (
                <li
                  className="latest__li"
                  key={album.id}
                  onClick={() => handleSelectAlbum(album)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src={album.image}
                      alt="album"
                    />
                    <div className="track_info">
                      <p className="track__name">{album.title}</p>
                      <p className="track__artist">{album.artist}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>Немає альбомів</p>
            )}
          </ul>
        </div>

        {/* ТРЕКИ */}
        <div className="latest__singles latest__music__part">
          <h3 className="latest__heading">latest songs</h3>
          <ul className="latest__list">
            {tracksLoading ? (
              <p>Завантаження треків</p>
            ) : topTracks.length > 0 ? (
              topTracks.map((track) => (
                <li
                  className="latest__li"
                  key={track.id}
                  onClick={() => handleSelectTrack(track)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src={track.image}
                      alt="track"
                    />
                    <div className="track_info">
                      <p className="track__name">{track.title}</p>
                      <p className="track__artist">{track.artist}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>Немає треків</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};