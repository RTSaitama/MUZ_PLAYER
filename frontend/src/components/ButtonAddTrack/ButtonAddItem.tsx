import { AddItemIcon } from "../../assets/icons/AddTrackIcon"
import type { Track, Album } from "../../types/typedefs"
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '../../store/store';
import { toggleModal } from "../../store/slices/modalStatusSlice";

type ButtonAddItemProps = {
  item: Track | Album;
}

export const ButtonAddItem = ({ item }: ButtonAddItemProps) => {

  const isOpen = useSelector((state: RootState) => state.modalStatus.isOpen);
  const dispatch = useDispatch();
  const onToggle = () => dispatch(toggleModal())

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        onToggle()
      }}
      className="item__add__btn btn "><AddItemIcon width={7} height={7} /></button>
  )
} 