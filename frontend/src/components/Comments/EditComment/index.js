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
    <form onSubmit={onSubmit}>
      <h2>Edit Comment</h2>
      <ul>
        {errors?.map((error) => (
          <li key={error} className='errors'>{error}</li>
        ))}
      </ul>
      <input
        type='text'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        name='title'
      />
      <div>
        <button className='save-btn'>Save</button>
        <button className='cancel-btn' onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditComment
