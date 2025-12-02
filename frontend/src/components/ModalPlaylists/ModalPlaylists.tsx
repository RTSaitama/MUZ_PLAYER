import { useDispatch, useSelector } from 'react-redux';
import { useGetPlaylistsQuery, useDeletePlaylistMutation, useAddMediaItemToPlaylistMutation } from '../../store/apis/playlistsApi';
import { toggleIsCreating, closeModal } from "../../store/slices/modalStatusSlice";
import type { RootState } from '../../store/store';
import { ModalNewPlaylist } from './ModalPlaylistName';
import { CloseItemIcon } from '../../../src/assets/icons/CloseItemIcon';
import clsx from 'clsx';

export const ModalPlaylist = () => {
  const dispatch = useDispatch();
  const isCreating = useSelector((state: RootState) => state.modalStatus.isCreating)
  const isOpen = useSelector((state: RootState) => state.modalStatus.isOpen);
  const { data: playlists = [] } = useGetPlaylistsQuery();
  const [onDeletePlaylist] = useDeletePlaylistMutation();
  const [onAddMediaItemToPlaylist] = useAddMediaItemToPlaylistMutation()
  const onOpenPlaylistNaming = () => dispatch(toggleIsCreating());
  const selectedMediaItem = useSelector((state: RootState) => state.modalStatus.selectedItem)
  const onHandleDeletePlaylist = async (id: number) => {
    onDeletePlaylist(id)
  }
  if (!isOpen) return null;
  
const onHandleAddItem = async (playlistId: number) => {
  if (!selectedMediaItem) return;

  await onAddMediaItemToPlaylist({
    playlistId,
    MediaItem: selectedMediaItem,
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
          {playlists.map(playlist => (
            <li
              onClick={() => onHandleAddItem(playlist.id)}
              key={playlist.id}
              className={clsx(
                "modal__list__item",
                {
                  "playlist_bg": playlist.tracks?.[0]?.image,
                  "playlist_no_bg": !playlist.tracks?.[0]?.image,
                }
              )}>
              <p
                className='modal__list__item_name'>{playlist.name}</p>
              <button
                onClick={() => onHandleDeletePlaylist(playlist.id)}
                className='modal__delete__btn'> <CloseItemIcon /></button>
            </li>
          ))}


          {isCreating && <ModalNewPlaylist />}

        </ul>
        <button type="button" onClick={() => onHandleCloseModal()} className="modal__close__btn">
          Закрити
        </button>
      </div>
    </div>
  );
};
