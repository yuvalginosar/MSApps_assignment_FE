// reducers/photoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photos: [],
  category: 'sports',
  page: 1,
  selectedPhoto: null,
  modalOpen: false,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSelectedPhoto: (state, action) => {
      state.selectedPhoto = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
  },
});

export const {
  setPhotos,
  setCategory,
  setPage,
  setSelectedPhoto,
  setModalOpen,
} = photoSlice.actions;

export default photoSlice.reducer;
