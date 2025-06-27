import React from 'react'
import { Swiper } from '../Swiper/Swiper'
import { Track, Album } from '../../types/typedefs';
import { usePlayerContext } from '../../context/PlayerContext';
interface Props {
  tracks: Track[];
  albums: Album[]
  onTrackSelect: (track: Track) => void;
}


export const MusicScreen: React.FC<Props> = ({ tracks, albums, onTrackSelect }) => {



  return (
    <div className="music__screen container">
      <Swiper />
      <div className="latest__music container music__screen__part">
        <div className="latest__album latest__music__part">
          <h3 className="latest__heading">latest album</h3>
          <ul className="latest__list">
            {albums?.length > 0 ? (
              albums.map(album => (
                <li className="latest__li" key={album.id}>
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src={album.image}
                      alt="track__img"
                    />
                    <div className="track_info">
                      <p className="track__name">{album.title}</p>
                      <p className="track__artist">{album.artist}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>Немає треків</p>
            )}
          </ul>
        </div>
        <div className="latest__singles latest__music__part">
          <h3 className="latest__heading">latest sings </h3>
          <ul className="latest__list">
            {tracks?.length > 0 ? (
              tracks.map(track => (
                <li
                  className="latest__li"
                  key={track.id}
                  onClick={() => onTrackSelect(track)}>
                  <div className="track__wrapp">
                    <img
                      className="track__img"
                      src={track.image}
                      alt="track__img"
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

  )
}
