import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchEditPlaylist, fetchPlaylist } from '../../../store/playlists'

function EditPlaylist({ playlist, setShowEditModal }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [errors, setErrors] = useState([])
    const [name, setName] = useState(playlist.name)
    const [imageUrl, setImageUrl] = useState(playlist.previewImage)
    // const [songs, setSongs] = useState(playlist.Songs)
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            id: playlist.id,
            name,
            imageUrl
        }
        await dispatch(fetchEditPlaylist(payload))
          .then(() => {
            dispatch(fetchPlaylist(playlist.id))
            setShowEditModal(false);
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
    }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit your playlist</h2>
      <ul>
        {errors?.map((error) => (
          <li className='errors' key={error}>
            {error}
          </li>
        ))}
      </ul>
      <label>
        Name
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          name='name'
        />
      </label>
      <label>
        Image
        <input
          type='text'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          name='image'
        />
      </label>
      <div>
        <button className='save-btn'>Save</button>
        <button className='cancel-btn' onClick={() => setShowEditModal(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditPlaylist
