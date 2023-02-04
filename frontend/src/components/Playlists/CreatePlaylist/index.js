import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCreatePlaylist } from '../../../store/playlists';
import './CreatePlaylist.css';

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
    <form className='create-playlist-form' onSubmit={handleSubmit}>
      <div className='create-playlist-modal-header'>
        <h2>Create a Playlist</h2>
      </div>
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
        placeholder='Title...'
      />
      <input
        type='text'
        value={previewImage}
        onChange={(e) => setPreviewImage(e.target.value)}
        name='previewImage'
        placeholder='Image URL...'
      />
      <div>
        <button className='submit-btn' type='submit'>Submit</button>
        <button className='cancel-btn' onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </form>
  )
}

export default CreatePlaylist
