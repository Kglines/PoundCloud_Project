import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDeleteSongs } from '../../../store/songs';

function DeleteSong({ songId, setShowDelForm }) {
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('songId', songId)

    const onDelete = () => {
        dispatch(fetchDeleteSongs(songId));
        return history.push('/currentuser');
    }

  return (
    <div>
      <h2>Are you sure you want to delete this song?</h2>
      <button onClick={() => onDelete()}>Delete</button>
      <button onClick={() => setShowDelForm(false)}>Cancel</button>
    </div>
  );
}

export default DeleteSong
