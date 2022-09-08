import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDeleteSongs } from '../../../store/songs';

function DeleteSong({ setShowDelModal }) {
    const { songId } = useParams();
    const parsedId = parseInt(songId, 10);
    const dispatch = useDispatch();
    const history = useHistory();
    // console.log('songId', songId)

    const onDelete = () => {
        dispatch(fetchDeleteSongs(songId)).then(() => {
          return history.push('/currentuser/songs');
        })
    }

  return (
    <div>
      <h2>Are you sure you want to delete this song?</h2>
      <button className='save-btn' onClick={() => onDelete()}>Delete</button>
      <button className='cancel-btn' onClick={() => setShowDelModal(false)}>Cancel</button>
    </div>
  );
}

export default DeleteSong
