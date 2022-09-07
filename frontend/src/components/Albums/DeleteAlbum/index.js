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
        return history.push('/currentuser');
    }

  return (
    <div>
        <h2>Are you sure you want to delete this album?</h2>
        <button onClick={() => onDelete()}>Delete</button>
        <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
    </div>
  )
}

export default DeleteAlbum
