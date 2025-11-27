import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { DiscoverIcon } from '../../assets/icons/DiscoverIcon'
import { FavouritesIcon } from '../../assets/icons/FavouritesIcon'
import { GenreIcon } from '../../assets/icons/GenreIcon'
import { PlaylistIcon } from '../../assets/icons/Playlist'
import { PodcastIcon } from '../../assets/icons/PodcastIcon'
import { TopChartsIcon } from '../../assets/icons/TopChartsIcon'
import { LogoIcon } from '../../assets/icons/LogoIcon'
interface Props {
  mobile: Boolean
}

export const Sidebar: React.FC<Props> = ({ mobile }) => {

  return (
    <aside className={classNames("side__menu navigation ",
      {
        [mobile ? 'is-open' : 'is-close']: true
      }
    )}>
      <nav className=" browse__bar bar">
        <NavLink to="/"><div className="  logo_icon">
          <LogoIcon width={70} height={70} stroke={'white'} />

        </div></NavLink>

        <ul className="bar__list">

          <li className="bar__li">
            <div className="bar__li__icon">
              <DiscoverIcon width={36} height={36} stroke={'white'} />
            </div>
            <NavLink to="discover" className="bar__li__name">discover</NavLink>
          </li>
          <li className="bar__li">
            <div className="bar__li__icon">
              <GenreIcon width={36} height={36} stroke={'white'} />
            </div>
            <NavLink to="genre" className="bar__li__name">genre</NavLink>
          </li>
          <li className="bar__li">
            <div className="bar__li__icon">
              <TopChartsIcon width={36} height={36} stroke={'white'} />
            </div>
            <NavLink to="charts" className="bar__li__name">top charts</NavLink>
          </li>
          <li className="bar__li">
            <div className="bar__li__icon">
              <PodcastIcon width={36} height={36} stroke={'white'} />
            </div>
            <NavLink to="podcast" className="bar__li__name">podcast</NavLink>
          </li>
        </ul>
      </nav>
      <div className="library__bar bar">
        <h3 className="bar__heading">library</h3>
        <ul className="bar__list">
          <li className="bar__li">
            <div className="bar__li__icon">
              <FavouritesIcon width={36} height={36} stroke={'white'} />
            </div>
            <p className="bar__li__name">favourites</p>
          </li>
          <li className="bar__li">
            <div className="bar__li__icon">
              <PlaylistIcon width={36} height={36} stroke={'white'} />
            </div>
            <p className="bar__li__name">playlist</p>
          </li>
        </ul>
      </div>
    </aside>
  )
}
