import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchDeletePlaylist } from '../../../store/playlists'
import './DeletePlaylist.css'

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
    <div className='create-playlist-form'>
      <div className='create-song-modal-header'>
        <h2>Delete Your Playlist</h2>
      </div>
      <div className='create-song-container'>
        <h2>Are you sure you want to delete this playlist?</h2>
        {errors?.map((error) => (
          <p key={error} className='errors'>
            {error}
          </p>
        ))}
        <div className='create-song-btns'>
          <button className='save-btn submit-song' onClick={() => onDelete()}>
            DELETE
          </button>
          <button
            className='cancel-btn cancel-song'
            onClick={() => setShowDeleteModal(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePlaylist
