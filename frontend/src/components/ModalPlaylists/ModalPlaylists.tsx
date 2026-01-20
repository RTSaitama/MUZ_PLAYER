import { useDispatch, useSelector } from 'react-redux';
import { useGetPlaylistsQuery, useDeletePlaylistMutation, useAddMediaItemToPlaylistMutation } from '../../redux/apis/playlistsApi';
import { toggleIsCreating, closeModal } from "../../redux/slices/modalStatusSlice";
import type { RootState } from '../../redux/store';
import { ModalNewPlaylist } from './ModalPlaylistName';
import { CloseItemIcon } from '../../assets/icons/item_options/CloseItemIcon';

export const ModalPlaylist = () => {
  const dispatch = useDispatch();
  const isCreating = useSelector((state: RootState) => state.modalStatus.isCreating)
  const isOpen = useSelector((state: RootState) => state.modalStatus.isOpen);
  const { data: playlists = [] } = useGetPlaylistsQuery();
  const [onDeletePlaylist] = useDeletePlaylistMutation();
  const [addMediaItemToPlaylist] = useAddMediaItemToPlaylistMutation()
  const onOpenPlaylistNaming = () => dispatch(toggleIsCreating());
  const selectedMediaItem = useSelector((state: RootState) => state.modalStatus.selectedItem)
  const onHandleDeletePlaylist = async (id: number) => {
    onDeletePlaylist(id)
  }
  if (!isOpen) return null;

  const onHandleAddItemToPlaylist = async (playlistId: number) => {
    if (!selectedMediaItem) return;

    await addMediaItemToPlaylist({
      playlistId,
      mediaItem: selectedMediaItem,
    });

    dispatch(closeModal());
  };
  const onHandleCloseModal = () => {
    dispatch(closeModal())
  }
  return (
    <div className="modal__overlay" onClick={() => onHandleCloseModal()}>
      <div className="modal__window" onClick={e => e.stopPropagation()}>
        <h3>Виберіть плейліст</h3>
        <button
          onClick={() => onOpenPlaylistNaming()}
          type="button" className="modal__create__btn">
          Create new playlist
        </button>
        <ul className="modal__list">
          {playlists.map(playlist => {
            console.log(playlist);
            return (         
            <li
              onClick={() => onHandleAddItemToPlaylist(playlist.id)}
              key={playlist.id}
              className='modal__list__item'>
                <img className='modal__list__item_img' src={playlist.tracks?.length > 0 ? playlist.tracks[0].image : '../frontend/src/assets/images/playlist_logo.webp'}/>
              <p
                className='modal__list__item_name'>{playlist.name}</p>
              <button
                onClick={() => onHandleDeletePlaylist(playlist.id)}
                className='modal__delete__btn'> <CloseItemIcon /></button>
            </li>
          )
        }
          )}

          {isCreating && <ModalNewPlaylist />}

        </ul>
        <button type="button" onClick={() => onHandleCloseModal()} className="modal__close__btn">
          Закрити
        </button>
      </div>
    </div>
  );
};
