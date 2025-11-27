import { usePlayer } from '../../hooks/usePlayer';
import { Player } from '../Player/Player';


  export const Footer = () => {
  const { currentTrack, isPlaying, playlistQueue } = usePlayer();
  const preparedTitle = currentTrack?.title && currentTrack.title.length <= 20 
  ? currentTrack.title 
  : `${currentTrack?.title?.slice(0, 20)}...`;
    return (
      <footer className="footer">
        <div className="footer__player__wrapper">
          <div className="footer__player__track">
            <div className="footer__player__track__icon"><img  src={currentTrack?.image} alt="currently playing track image" /></div>
            <div className="footer__player__track__name">
              {preparedTitle}
               <div className="footer__player__track__artist">{currentTrack?.artist}</div>
            </div>
          </div>
          <Player />
        </div>
      </footer>
    )
  }
  