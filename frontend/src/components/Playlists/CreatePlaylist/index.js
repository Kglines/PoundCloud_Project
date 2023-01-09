import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCreatePlaylist } from '../../../store/playlists';

function CreatePlaylist({ user, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name, 
            imageUrl: previewImage, 
            userId: user.id
        }

        const newPlaylist = dispatch(fetchCreatePlaylist(payload))
          .then(() => {
            history.push(`/currentuser/playlists`)
            setShowModal(false)
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
          })

        return newPlaylist;
    };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a playlist</h2>
      <ul>
        {errors?.map(error => (
          <li className='errors' key={error}>{error}</li>
        ))}
      </ul>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        name='name'
        placeholder='Title'
      />
      <input
        type='text'
        value={previewImage}
        onChange={(e) => setPreviewImage(e.target.value)}
        name='previewImage'
        placeholder='Image'
      />
      <button className='submit-btn' type='submit'>Submit</button>
      <button className='cancel-btn' onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  )
}

export default CreatePlaylist
