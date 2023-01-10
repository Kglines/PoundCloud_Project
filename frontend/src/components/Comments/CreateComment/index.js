import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateComments, fetchGetComments } from '../../../store/comments';
import { fetchSong } from '../../../store/songs';
import './CreateComment.css'

function CreateComment({ song }) {
    const dispatch = useDispatch();
    
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            body
        }

        await dispatch(fetchCreateComments(song?.id, payload))
          .then(() => {
            dispatch(fetchGetComments(song?.id));
            // dispatch(fetchSong(song?.id))
            setBody('');
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
          })
    }

  return (
    <form onSubmit={handleSubmit} className='create-comment-form'>
      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      {/* <h2>Comments</h2> */}
      <input
        type='text'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        name='body'
        placeholder='Write a comment...'
      />
      
        <button className='submit-comment'>Submit</button>
      
    </form>
  );
}

export default CreateComment
