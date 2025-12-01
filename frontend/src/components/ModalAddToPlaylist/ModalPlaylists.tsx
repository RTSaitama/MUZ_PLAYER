import { useDispatch, useSelector} from 'react-redux';
import { useGetPlaylistsQuery,useCreatePlaylistMutation } from '../../store/apis/playlistsApi';
import { toggleModal, toggleIsCreating } from "../../store/slices/modalStatusSlice";
import type { RootState } from '../../store/store';
import { ModalNewPlaylist } from './ModalPlaylistName';

export const ModalPlaylist = () => {
  const dispatch = useDispatch();
  const isCreating = useSelector((state: RootState) => state.modalStatus.isCreating)
  const isOpen = useSelector((state: RootState) => state.modalStatus.isOpen);
  const onToggle = () => dispatch(toggleModal());
  
  const { data: playlists = [] } = useGetPlaylistsQuery();
  const onOpenPlaylistNaming = () => dispatch(toggleIsCreating());
  

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
                {playlist.name}
              </button>
            </li>
          ))}
          <button 
          onClick={() => onOpenPlaylistNaming()}
          type="button" className="modal__create__btn">
          Create new playlist
        </button>

        {isCreating && <ModalNewPlaylist />}
        
        </ul>
        <button type="button" onClick={() => onToggle()} className="modal__close__btn">
          Закрити
        </button>
      </div>
    </div>
  );
};
