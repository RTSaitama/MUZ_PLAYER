import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { DiscoverIcon } from '../../assets/icons/DiscoverIcon'
import { FavouritesIcon } from '../../assets/icons/FavouritesIcon'
import { GenreIcon } from '../../assets/icons/GenreIcon'
import { PlaylistIcon } from '../../assets/icons/Playlist'
import { PodcastIcon } from '../../assets/icons/PodcastIcon'
import { TopChartsIcon } from '../../assets/icons/TopChartsIcon'
import { LogoIcon } from '../../assets/icons/LogoIcon'
import { useTranslation } from 'react-i18next'

 
export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <>
    <aside className={classNames("side__menu navigation ",
    //   {
    //     [mobile ? 'is-open' : 'is-close']: true
    //   }
     )}>
      <nav className=" browse__bar bar">
        <div className="logo_n_profile_wrapper">
        <NavLink to="/">
          <div className="logo_icon">
            <LogoIcon width={70} height={70} stroke={'white'} />

          </div>
        </NavLink>
              <NavLink to="/login">
          <div className="register_icon">
            <LogoIcon width={70} height={70} stroke={'white'} />

          </div>
        </NavLink>
        </div>
        <ul className="bar__list">

          <li className="bar__li">
            <div className="bar__li__icon">
              <DiscoverIcon width={36} height={36} stroke={'white'} />
            </div>
            <NavLink to="discover" className="bar__li__name">{t('discover')}</NavLink>
          </li>
          <li className="bar__li">
            <div className="bar__li__icon">
              <GenreIcon width={36} height={36} stroke={'white'} />
            </div>
            <NavLink to="genre" className="bar__li__name">{t('genre')}</NavLink>
          </li>
          <li className="bar__li">
            <div className="bar__li__icon">
              <TopChartsIcon width={36} height={36} stroke={'white'} />
            </div>
            <NavLink to="charts" className="bar__li__name">{t('top charts')}</NavLink>
          </li>
          <li className="bar__li">
            <div className="bar__li__icon">
              <PodcastIcon width={36} height={36} stroke={'white'} />
            </div>
            <NavLink to="podcast" className="bar__li__name">{t('podcast')}</NavLink>
          </li>
        </ul>
      </nav>
      <div className="library__bar bar">
        <h3 className="bar__heading">{t('library')}</h3>
        <ul className="bar__list">
          <li className="bar__li">
            <div className="bar__li__icon">
              <FavouritesIcon width={36} height={36} stroke={'white'} />
            </div>
            <NavLink to='/favourites'>
              <p className="bar__li__name">{t('favourites')}</p>
            </NavLink>
          </li>
          <li className="bar__li">
            <div className="bar__li__icon">
              <PlaylistIcon width={36} height={36} stroke={'white'} />
            </div>
            <NavLink to="/playlists">
              <p className="bar__li__name">{t('playlist')}</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
    </>
  )
}
