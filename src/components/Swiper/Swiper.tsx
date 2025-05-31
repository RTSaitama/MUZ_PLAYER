import React from 'react'
interface Props {

}

export const Swiper: React.FC<Props> = () => {
  return (
    <div className="swiper__wrapper music__screen__part">
      <h3 className="music__screen__heading">top album</h3>
      <div className="swiper">
        <button className="swiper__arrow arrow__prev"> </button>
          <ul className="music__list">
            <li className="music__pictures"></li>
            <li className="music__pictures"></li>
            <li className="music__pictures"></li>
            <li className="music__pictures"></li>
            <li className="music__pictures"></li>
          </ul>
        <button className="swiper__arrow arrow__next"></button>
      </div>
    </div>
  )
}
