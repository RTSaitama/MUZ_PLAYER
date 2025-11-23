 import { useGetTopAlbumsQuery } from '../../store/apis/itunesApi'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { useRef } from 'react';
import { SlideNextButton } from './SlideNextButton';
import { SlidePrevButton } from './SlidePrevButton';

export const SwiperScreen = () => {
  const { data: albums = [], isLoading: albumsLoading } = useGetTopAlbumsQuery();
  const swiperRef = useRef(null);

  return (
    <div className="swiper__wrapper music__screen__part">
      <h3 className="music__screen__heading">top album</h3>
      <div className="swiper">
     <SlidePrevButton swiperRef={ swiperRef }/>
        
        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={7}
          navigation={false}
          loop={true}
          modules={[Navigation, Scrollbar]}
          className="music__list"
        >
          {albumsLoading ? (
            <p>albums are loading...</p>
          ) : (
            albums.map(album => (
              <SwiperSlide key={album.id}>
                <img src={album.image} alt="album img" className="music__pictures" />
              </SwiperSlide>
            ))
          )}
        </Swiper>
        
          <SlideNextButton swiperRef={ swiperRef }/>
      </div>
    </div>
  )
}