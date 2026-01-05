import { usePlayer } from "@/hooks/usePlayer";
import { useParams } from "react-router-dom";
import { ButtonItemSettings } from "@/components/ButtonTrackSettings/ButtonItemSettings";
import { ItemOrder } from "@/components/ItemOrder/ItemOrder";
import { useGetPlaylistQuery, useRemoveMediaItemFromPlaylistMutation } from "@/redux/apis/playlistsApi";
export const PlaylistDetailsPage = () => {
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
  if (isLoading) return <div>Завантаження</div>;
  if (isError) return <div>Помилка завантаження плейлиста</div>;
  if (!playlist) return <div>Плейлист не знайдено</div>;

  return (
    <div className="pages__wrapper playlistDetail__page_wrapper">
      <h3 className="latest__heading playlist_details__heading">{playlist.name}</h3>

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
                <ButtonItemSettings
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
