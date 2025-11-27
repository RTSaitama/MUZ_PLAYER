export const SlidePrevButton = ({ swiperRef }: any) => {
  return (
    <button 
        onClick={() => swiperRef.current?.swiper?.slidePrev()}
      className="swiper__arrow arrow__prev"
    />
  )
}