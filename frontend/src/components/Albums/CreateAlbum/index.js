import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCreateAlbums } from '../../../store/albums';
import { useHistory } from 'react-router-dom';
import './CreateAlbum.css';

function CreateAlbum({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [validationErrors, setValidationErrors] = useState([])

    const defaultImage =
      'https://images.unsplash.com/photo-1559424452-eeb3a13ffe2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80';

    // useEffect(() => {

    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            imageUrl: imageUrl || defaultImage
        }
        
        await dispatch(fetchCreateAlbums(payload))
          .then(() => {
            history.push(`/currentuser/albums`);
            setTitle('');
            setDescription('');
            setImageUrl('');
            setShowModal(false);
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
          });
    }

  return (
    <form className='create-album-modal' onSubmit={handleSubmit}>
      <div className='create-album-modal-header'>
        <h2>Create an album</h2>
      </div>
      <div className='create-album-container'>

        <ul>
          {validationErrors.map((error) => (
            <li className='errors' key={error}>
              {error}
            </li>
          ))}
        </ul>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name='title'
          placeholder='Title'
        />
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name='description'
          placeholder='Description'
        />
        <input
          type='text'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          name='imageUrl'
          placeholder='Album art url'
        />
        <div className='create-song-btns'>
            <button className='submit-btn submit-song'>Submit</button>
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

export default CreateAlbum
