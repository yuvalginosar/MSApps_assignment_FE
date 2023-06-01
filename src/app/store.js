import { configureStore } from '@reduxjs/toolkit';
import photosReducer from '../features/photos/photoSlice';

export const store = configureStore({
  reducer: {
    photo: photosReducer,
  },
});
