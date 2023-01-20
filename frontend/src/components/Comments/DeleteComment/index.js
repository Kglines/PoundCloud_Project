import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchDeleteComments, fetchGetComments } from '../../../store/comments';
import { fetchSong } from '../../../store/songs';

function DeleteComments({ comment, song }) {
    
    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch(fetchDeleteComments(comment?.id))
        .then(() =>
          dispatch(fetchGetComments(song?.id))
        );       
    };

  return (
    <div>
        <button className='delete-btn' onClick={() => onDelete()}>Delete</button>
    </div>
  )
}

export default DeleteComments
