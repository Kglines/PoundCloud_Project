import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDeleteAlbums } from '../../../store/albums';


function DeleteAlbum({ albumId, setShowDeleteModal }) {
    const history = useHistory();
    const dispatch = useDispatch()
    console.log('albumId', albumId);

    const onDelete = () => {
        dispatch(fetchDeleteAlbums(albumId));
        return history.push('/currentuser/albums');
    }

  return (
    <div>
        <h5>Are you sure you want to delete this album?</h5>
        <button className='album-delete-btn' onClick={() => onDelete()}>Delete</button>
        <button className='album-cancel-del-btn' onClick={() => setShowDeleteModal(false)}>Cancel</button>
    </div>
  )
}

export default DeleteAlbum
