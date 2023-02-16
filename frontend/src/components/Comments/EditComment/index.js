import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchEditComments, fetchGetComments } from '../../../store/comments';


function EditComment({ comment, setShowModal }) {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()

    const [body, setBody] = useState(comment?.body)
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id: comment?.id,
            body
        }

        dispatch(fetchEditComments(payload))
            .then(() => {
                setShowModal(false)
                dispatch(fetchGetComments(songId));
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }
    
  return (
    <form className='create-song-form' onSubmit={onSubmit}>
      <div className='create-song-modal-header'>
        <h2>Edit Comment</h2>
      </div>
      <div className='create-song-container'>
        <ul>
          {errors?.map((error) => (
            <li key={error} className='errors'>
              {error}
            </li>
          ))}
        </ul>
        
          <input
            className='create-song-input'
            type='text'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            name='title'
          />
          <div className='create-song-btns'>
            <button className='save-btn submit-song'>Save</button>
            <button
              className='cancel-btn cancel-song'
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
      </div>
    </form>
  );
}

export default EditComment
