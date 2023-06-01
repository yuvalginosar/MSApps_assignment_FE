// App.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import {
  setPhotos,
  setCategory,
  setPage,
  setSelectedPhoto,
  setModalOpen,
} from './features/photos/photoSlice';
import { Grid, Button, ImageList, ImageListItem } from '@mui/material';
import "./App.css"

Modal.setAppElement('#root');

function App() {
  const photos = useSelector((state) => state.photo.photos);
  const category = useSelector((state) => state.photo.category);
  const page = useSelector((state) => state.photo.page);
  const selectedPhoto = useSelector((state) => state.photo.selectedPhoto);
  const modalOpen = useSelector((state) => state.photo.modalOpen);
  const dispatch = useDispatch();



  useEffect(() => {
    fetchPhotos();
  }, [category, page]);

  const fetchPhotos = async () => {
    const url = `http://localhost:8000/photos/`
    try {
      console.log('here')


      const response = await axios.get(
        `${url}${category}?page=${page}`
      );
      
      const data = response.data.hits;
      dispatch(setPhotos(data));
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handlePrevClick = () => {
    dispatch(setPage(page - 1));
  };

  const handleNextClick = () => {
    dispatch(setPage(page + 1));
  };

  const handleTypeSelect = () => {
    const selectedType = prompt('Enter the type of photos (e.g., animals, sports, work)');
    if (selectedType) {
      dispatch(setCategory(selectedType.trim().toLowerCase()));
      dispatch(setPage(1));
    }
  };

  const handlePhotoClick = (photo) => {
    dispatch(setSelectedPhoto(photo));
    dispatch(setModalOpen(true));
  };

  const closeModal = () => {
    dispatch(setModalOpen(false));
  };



return (
  <div>
    <div className="top-bar">
      <Button variant="contained" onClick={handlePrevClick}>prev</Button>
      <Button variant="contained" onClick={handleTypeSelect}>Select Type</Button>
      <Button variant="contained" onClick={handleNextClick}>next</Button>
    </div>
    <ImageList sx={{ width: '100%', height: '100vh' }} cols={3} rowHeight={164} spacing={10}>
      {photos.map((photo) => (
        <ImageListItem key={photo.id}>
          <img
          className='image'
            src={`${photo.webformatURL}?w=164&h=164&fit=crop&auto=format`}
            alt={photo.tags}
            loading="lazy"
            onClick={() => handlePhotoClick(photo)}
          />
        </ImageListItem>
      ))}
    </ImageList>
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      contentLabel="Photo Details"
      className="modal"
      overlayClassName="overlay"
    >
      {selectedPhoto && (
        <div>
          <h3>{selectedPhoto.tags}</h3>
          <p>Views: {selectedPhoto.views}</p>
          <p>Downloads: {selectedPhoto.downloads}</p>
          <p>Collections: {selectedPhoto.collections}</p>
        </div>
      )}
      <button onClick={closeModal}>Close</button>
    </Modal>
  </div>
);




  }

export default App;
