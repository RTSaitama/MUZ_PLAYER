import { useGetTopAlbumsQuery } from '../../store/apis/itunesApi'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { useRef } from 'react';
import { SlideNextButton } from './SlideNextButton';
import { SlidePrevButton } from './SlidePrevButton';
import { usePlayer } from '../../hooks/usePlayer';
import { useTranslation } from 'react-i18next';
export const SwiperScreen = () => {
  const { t } = useTranslation();
  const { data: albums = [], isLoading: albumsLoading } = useGetTopAlbumsQuery();
  const swiperRef = useRef(null);
  const { handleSelectAlbum } = usePlayer();

  return (
    <div className="swiper__wrapper music__screen__part">
      <h3 className="music__screen__heading">{t('TOP ALBUMS')}</h3>
      <div className="swiper">
        <SlidePrevButton swiperRef={swiperRef} />

        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={7}
          centeredSlides={true}
          navigation={false}
          loop={true}
          modules={[Navigation, Scrollbar]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 7,
              spaceBetween: 50,
            }
          }}
          className="music__list"
        >
          {albumsLoading ? (
            <p>albums are loading...</p>
          ) : (
            albums.map(album => (
              <SwiperSlide key={album.id}>
                <img onClick={() => handleSelectAlbum(album)}
                  src={album.image} alt="album img" className="music__pictures" />
              </SwiperSlide>
            ))
          )}
        </Swiper>

        <SlideNextButton swiperRef={swiperRef} />
      </div >
    </div >
  )
}