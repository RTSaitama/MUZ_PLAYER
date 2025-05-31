import React from 'react'
interface Props {
  
}

export const Footer: React.FC<Props> = () => {
  return (
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
  )
}
