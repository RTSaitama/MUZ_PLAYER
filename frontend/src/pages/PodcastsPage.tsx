import { usePlayer } from "@/hooks/usePlayer"
import { Podcast } from '../types/typedefs'
import { useTranslation } from "react-i18next";

export const PodcastsPage  = () => {
  const { podcasts, podcastsLoading } = usePlayer();
  const { t } = useTranslation();
  return (
    <div className='pages__wrapper'>
      <ul className="podcasts__list">
        {podcastsLoading ? (
          <p>{t('podacsts loading')}</p>
        ) : podcasts && podcasts.length > 0 ? (
          podcasts.map((podcast:Podcast) => {
            return (
              <li key={podcast.id} className="podcasts_list__item">
                <img 
                  className="podcast__image" 
                  src={podcast.artwork}
                  alt={podcast.name}
                />
                <p className="podcast__title">{podcast.name}</p>
                {/* <p className="podcast__description">{podcast.feedUrl}</p> */}
              </li>
            );
          })
        ) : (
          <p>Немає подкастів</p>
        )}
      </ul>
    </div>
  );
};