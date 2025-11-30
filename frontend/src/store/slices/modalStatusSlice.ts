import { createSlice } from "@reduxjs/toolkit";

type ModalInitialState = {
 isOpen:boolean,
}
 const initialState: ModalInitialState = {
  isOpen:false
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
  },
})
export const {
toggleModal,
openModal,
closeModal
} = modalStatusSlice.actions;