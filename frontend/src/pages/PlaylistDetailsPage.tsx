import { usePlayer } from "@/hooks/usePlayer";
import { useNavigate, useParams } from "react-router-dom";
import { ItemSettingsBtn } from "@/components/Buttons/ItemSettings/ItemSettingsBtn";
import { ItemOrder } from "@/components/ItemOrder/ItemOrder";
import { useGetPlaylistQuery, useRemoveMediaItemFromPlaylistMutation } from "@/redux/apis/playlistsApi";
import { useTranslation } from "react-i18next";

export const PlaylistDetailsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const playlistId = Number(id);
  const { data: playlist, isLoading, isError } = useGetPlaylistQuery(playlistId, { skip: !playlistId });
  const { handleSelectTrack } = usePlayer();
  const [removeMediaItemFromPlaylist] = useRemoveMediaItemFromPlaylistMutation();
  const onHandleRemoveMediaItemFromPlaylist = async (playlistId: number, trackId: string) => {
    console.log('remove button click');
    try {
      await removeMediaItemFromPlaylist({ playlistId, trackId }).unwrap();
      console.log('Media item removed from playlist successfully');
    } catch (error) {
      console.error('Error removing media item from playlist:', error);
    }
  }
  const playlistTracks = playlist?.tracks;
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>{t('latest albums')}</div>;
  if (!playlist) return <div>{t('playlist not found')}</div>;

  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <div className="pages__wrapper playlistDetail__page_wrapper">
      <div className="pages__top-bar">
                <button className="back-btn" onClick={handleGoBack}>
              <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 38L6 21L23 4" stroke="#d36a19ff" stroke-width="8"   />
              </svg>
              go back </button>
                    <h3 className="latest__heading playlist_details__heading top-bar-heading">{playlist.name}</h3>

              </div>

      <ul className="latest__list playlist_details__list">
        {playlistTracks?.map((track, index) => {
          const preparedTitle = `${track.title.slice(0, 20)}...`;
          return (
            <li
              className="latest__li playlist_details__li"
              key={track.id}
              onClick={() => handleSelectTrack(track)}
              style={{ cursor: "pointer" }}
            >
              <div className="item__wrapp">
                <img className="item__img" src={track.image} alt="track" />
                <div className="item__info">
                  <p className="item__name">{preparedTitle}</p>
                  <p className="item__artist">{track.artist}</p>
                </div>
              </div>
              <div className="item__options">
                <ItemSettingsBtn
                  onClick={() => track.trackId && onHandleRemoveMediaItemFromPlaylist(playlistId, track.trackId)}
                />
                <ItemOrder index={index} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
