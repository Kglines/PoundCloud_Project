import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchDeletePlaylist } from '../../../store/playlists'

function DeletePlaylist({ setShowDeleteModal, playlist}) {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);

  const onDelete = () => {
    dispatch(fetchDeletePlaylist(playlistId))
      .then(() => {
        return history.push('/currentuser');
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  return (
    <div>
      <h2>Are you sure you want to delete this playlist?</h2>
      {errors?.map((error) => (
        <p key={error} className='errors'>
          {error}
        </p>
      ))}
      <button className='save-btn' onClick={() => onDelete()}>
        Delete
      </button>
      <button className='cancel-btn' onClick={() => setShowDeleteModal(false)}>Cancel</button>
    </div>
  );
}

export default DeletePlaylist
