import { useDispatch } from "react-redux";
import { toggleIsCreating } from "../../redux/slices/modalStatusSlice";
import { useState } from "react";
import { useCreatePlaylistMutation } from "../../redux/apis/playlistsApi";

export const ModalNewPlaylist = () => {
  const dispatch = useDispatch();
  const [name,setName] = useState('')
  const onCloseModal = () => dispatch(toggleIsCreating());

  const [createPlaylist] = useCreatePlaylistMutation();
  const handleCreate = async () => {
    if(!name.trim()) {
        return
      }
    try {
      await createPlaylist(name).unwrap();
      onCloseModal();
      setName('')
    } catch (err) {
      console.error("Failed to create playlist", err);
  }
}
  return (
    <div className="modalNew__overlay" onClick={onCloseModal}>
      <div className="modalNew__window" onClick={e => e.stopPropagation()}>
        <h3 className="modalNew__title">let's create new playlist</h3>

        <input
          type="text"
          className="modalNew__input"
          placeholder="Назва плейліста"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
        onClick={() => handleCreate()}
         type="button" className="modalNew__ok__btn">
          OK
        </button>
      </div>
    </div>
  );
};