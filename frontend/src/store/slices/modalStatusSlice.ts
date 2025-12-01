import { createSlice } from "@reduxjs/toolkit";

type ModalInitialState = {
 isOpen:boolean,

 isCreating:boolean
}
 const initialState: ModalInitialState = {
  isOpen:false,
  isCreating:false,
}
 export const modalStatusSlice = createSlice({
  name:'modal',
  initialState,
  reducers: {
   toggleModal:(state) => {
    state.isOpen = !state.isOpen
   },
     openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
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

} = modalStatusSlice.actions;