 

export const SlideNextButton  = ({ swiperRef }: any) => {

  return (
  <button 
      onClick={() => swiperRef.current?.swiper?.slideNext()}
  className="swiper__arrow arrow__next">

  </button>
  )
}