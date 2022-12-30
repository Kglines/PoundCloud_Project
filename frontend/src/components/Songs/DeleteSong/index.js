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
    <div>
      <h2>Are you sure you want to delete this song?</h2>
      {validationErrors?.map(error => (
        <p key={error} className='errors'>{error}</p>
      ))}
      <button className='save-btn' onClick={() => onDelete(songId)}>Delete</button>
      <button className='cancel-btn' onClick={() => setShowDelModal(false)}>Cancel</button>
    </div>
  );
}

export default DeleteSong
