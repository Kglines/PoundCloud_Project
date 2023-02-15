import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDeleteAlbums } from '../../../store/albums';


function DeleteAlbum({ albumId, setShowDeleteModal }) {
    const history = useHistory();
    const dispatch = useDispatch();
  

    const onDelete = () => {
        dispatch(fetchDeleteAlbums(albumId)).then(() => {
          return history.push('/currentuser/albums');
        })
    }

  return (
    <div className='create-song-form'>
      <div className='create-song-modal-header'>
        <h2>Delete Your Album</h2>
      </div>
      <div className='create-song-container'>
        <h5>Are you sure you want to delete this album?</h5>
        <div className='create-song-btns'>
          <button
            className='album-delete-btn'
            submit-song
            onClick={() => onDelete()}
          >
            DELETE
          </button>
          <button
            className='album-cancel-del-btn cancel-song'
            onClick={() => setShowDeleteModal(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAlbum
