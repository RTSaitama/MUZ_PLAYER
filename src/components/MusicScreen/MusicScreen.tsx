import React from 'react';
import { useDispatch } from 'react-redux';
import { useGetTopTracksQuery, useGetTopAlbumsQuery } from '../../store/apis/itunesApi';
import { setCurrentTrack, setPlaylistQueue } from '../../store/slices/playerSlice';
import { Swiper } from '../Swiper/Swiper';
import { Track, Album } from '../../types/typedefs';

export const MusicScreen = () => {
  const dispatch = useDispatch();
  
  const { data: tracks = [], isLoading: tracksLoading } = useGetTopTracksQuery();
  const { data: albums = [], isLoading: albumsLoading } = useGetTopAlbumsQuery();

  const handleTrackSelect = (track: Track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setPlaylistQueue([track]));
  };

  const handleAlbumSelect = (album: Album) => {
    console.log('Album selected:', album.id);
  };

  return (
    <div className="music__screen container">
      <Swiper />
      <div className="latest__music container music__screen__part">
        {/* АЛЬБОМИ */}
        <div className="latest__album latest__music__part">
          <h3 className="latest__heading">latest album</h3>
          <ul className="latest__list">
            {albumsLoading ? (
              <p>Завантаження альбомів</p>
            ) : albums.length > 0 ? (
              albums.map((album) => (
                <li
                  className="latest__li"
                  key={album.id}
                  onClick={() => handleAlbumSelect(album)}
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
            ) : tracks.length > 0 ? (
              tracks.map((track) => (
                <li
                  className="latest__li"
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
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