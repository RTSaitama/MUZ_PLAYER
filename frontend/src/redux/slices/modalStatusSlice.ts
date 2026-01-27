import { MediaItem} from "@/types/typedefs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalInitialState = {
 isOpen:boolean,
 isCreating:boolean,
 selectedItem: MediaItem | null, 
}

 
 const initialState: ModalInitialState = {
  isOpen:false,
  isCreating:false,
  selectedItem: null,
}
 export const modalStatusSlice = createSlice({
  name:'modal',
  initialState,
  reducers: {
   toggleModal:(state,action:PayloadAction<MediaItem>) => {
    state.isOpen = !state.isOpen
    state.selectedItem = action.payload
   },
     openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectedItem = null;
    },
    toggleModalNewPlaylist: (state) => {
      state.isOpen = !state.isOpen
    },
    toggleIsCreating:(state) => {
      state.isCreating = !state.isCreating
    }
  },
})
export const {
  toggleModal,
  openModal,
  closeModal,
  toggleIsCreating,
  toggleModalNewPlaylist,

} = modalStatusSlice.actions;