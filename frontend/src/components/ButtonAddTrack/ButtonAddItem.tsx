import { AddItemIcon } from "../../assets/icons/AddTrackIcon"
import type {  MediaItem } from "../../types/typedefs"
import {  useDispatch } from "react-redux";
import { toggleModal } from "../../redux/slices/modalStatusSlice";

type ButtonAddItemProps = {
  mediaItem: MediaItem
}

export const ButtonAddItem = ({ mediaItem }: ButtonAddItemProps) => {

   const dispatch = useDispatch();
  const onToggle = () => dispatch(toggleModal(mediaItem))

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        onToggle()
      }}
      className="item__add__btn btn "><AddItemIcon width={7} height={7} /></button>
  )
} 