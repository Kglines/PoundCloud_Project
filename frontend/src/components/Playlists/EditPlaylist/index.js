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
    <form className='create-playlist-form' onSubmit={handleSubmit}>
      <div className='create-playlist-modal-header'>
        <h2>Edit your playlist</h2>
      </div>
      <div className='create-playlist-container'>
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
            className='create-playlist-input'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            name='name'
          />
        </label>
        <label>
          Image
          <input
            className='create-playlist-input'
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            name='image'
          />
        </label>
        <div className='create-song-btns'>
          <button className='save-btn submit-song'>SAVE</button>
          <button
            className='cancel-btn cancel-song'
            onClick={() => setShowEditModal(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditPlaylist
