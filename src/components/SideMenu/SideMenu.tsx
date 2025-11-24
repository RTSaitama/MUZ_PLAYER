import React from 'react'
import classNames from 'classnames'
import { DiscoverIcon } from '../../assets/icons/DiscoverIcon'
import { FavouritesIcon } from '../../assets/icons/FavouritesIcon'
import { GenreIcon } from '../../assets/icons/GenreIcon'
import { PlaylistIcon } from '../../assets/icons/Playlist'
import { PodcastIcon } from '../../assets/icons/PodcastIcon'
 import { TopChartsIcon } from '../../assets/icons/TopChartsIcon'
interface Props {
  mobile:Boolean
}

export const SideMenu:React.FC<Props> = ({ mobile }) => {

  return (
    <aside className={classNames("side__menu navigation ",
      {
        [mobile ? 'is-open' : 'is-close']: true
      }
    )}>
      <nav className=" browse__bar bar">
        <ul className="bar__list">
          <li className="bar__li">
            <div className="bar__li__icon">
             <DiscoverIcon width={36} height={36} stroke={'white'} />
            </div>
            <p className="bar__li__name">discover</p>
          </li>
          <li className="bar__li">
            <div className="bar__li__icon">
               <GenreIcon width={36} height={36} stroke={'white'} />
            </div>
            <p className="bar__li__name">genre</p>
          </li>
          <li className="bar__li">
            <div className="bar__li__icon">
              <TopChartsIcon width={36} height={36} stroke={'white'} />
            </div>
            <p className="bar__li__name">top charts</p>
          </li>
          <li className="bar__li">
            <div className="bar__li__icon">
               <PodcastIcon width={36} height={36} stroke={'white'} />
            </div>
            <p className="bar__li__name">podcast</p>
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
              <PlaylistIcon width={36} height={36} stroke={'white'}/>
            </div>
            <p className="bar__li__name">playlist</p>
          </li>
        </ul>
      </div>
    </aside>
  )
}
