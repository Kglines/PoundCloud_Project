import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDeleteSongs } from '../../../store/songs';

function DeleteSong({ setShowDelModal }) {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [validationErrors, setValidationErrors] = useState([])

    const onDelete = (songId) => {
        dispatch(fetchDeleteSongs(songId))
          .then(() => {
            return history.push('/currentuser');
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
          })
    }

  return (
    <div className='create-song-form'>
      <div className='create-song-modal-header'>
        <h2>Delete Your Song</h2>
      </div>
      <div className='create-song-container'>
        <h2>Are you sure you want to delete this song?</h2>
        {validationErrors?.map((error) => (
          <p key={error} className='errors'>
            {error}
          </p>
        ))}
        <div className='create-song-btns'>
          <button
            className='save-btn submit-song'
            onClick={() => onDelete(songId)}
          >
            Delete
          </button>
          <button className='cancel-btn cancel-song' onClick={() => setShowDelModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSong
