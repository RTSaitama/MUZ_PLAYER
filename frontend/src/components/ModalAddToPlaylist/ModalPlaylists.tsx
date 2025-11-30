import { useDispatch, useSelector} from 'react-redux';
import { useGetPlaylistsQuery } from '../../store/apis/playlistsApi';
import { toggleModal } from "../../store/slices/modalStatusSlice";
import type { RootState } from '../../store/store';

type Playlist = { id: number; name: string };

export const ModalPlaylist = () => {
  const dispatch = useDispatch();
   const isOpen = useSelector((state: RootState) => state.modalStatus.isOpen);
  const onToggle = () => dispatch(toggleModal());

  const { data: playlists = [] } = useGetPlaylistsQuery();
 if (!isOpen) return null;
  return (
    <div className="modal__overlay" onClick={() =>onToggle()}>
      <div className="modal__window" onClick={e => e.stopPropagation()}>
        <h3>Виберіть плейліст</h3>
        <ul className="modal__list">
          {playlists.map(playlist => (
            <li key={playlist.id} className="modal__list__item">
              <button
                type="button"
                className="modal__button"
              >
                {playlist.id}
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() =>onToggle()} className="modal__close__btn">
          Закрити
        </button>
      </div>
    </div>
  );
};
