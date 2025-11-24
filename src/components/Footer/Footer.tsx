  import { Player } from '../Player/Player';


  export const Footer = () => {
 
    return (
      <footer className="footer">
        <div className="footer__player__wrapper">
          <div className="footer__player__track">
            <div className="footer__player__track__icon"> </div>
            <div className="footer__player__track__name">
              <div className="footer__player__track__name">
              
              </div>
              <div className="footer__player__track__artist"> </div>
            </div>
          </div>
          <Player />
        </div>
      </footer>
    )
  }
  