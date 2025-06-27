  import React from 'react'
  import { Track } from '../../types/typedefs';
  import { Player } from '../Player/Player';

  interface Props {
    playlistIsRecording: Track[];
    trackIsRecording: Track | null;
  }

  export const Footer: React.FC<Props> = ({playlistIsRecording,trackIsRecording}) => {
    return (
      <footer className="footer">
        <div className="footer__player__wrapper">
          <div className="footer__player__track">
            <div className="footer__player__track__icon"><img src={trackIsRecording?.image} alt={trackIsRecording?.title} /></div>
            <div className="footer__player__track__name">
              <div className="footer__player__track__name">
                {trackIsRecording?.title}
              </div>
              <div className="footer__player__track__artist">{trackIsRecording?.artist}</div>
            </div>
          </div>
          <Player track={trackIsRecording} playlist={playlistIsRecording}/>
        </div>
      </footer>
    )
  }
  