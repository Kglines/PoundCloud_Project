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

    // useEffect(() => {

    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            imageUrl
        }
        
        await dispatch(fetchCreateAlbums(payload))
          .then(() => {
            history.push(`/currentuser/albums`);
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
          });

        setTitle('');
        setDescription('');
        setImageUrl('');
        setShowModal(false);
    }

  return (
    <form onSubmit={handleSubmit}>
    <ul>
      {validationErrors.length > 0 && validationErrors.map(error => (
        <li className='errors' key={error}>{error}</li>
      ))}
    </ul>
      <h2>Create an album</h2>
      <label>
        Title
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name='title'
          placeholder='Title'
        />
      </label>
      <label>
        Description
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name='description'
          placeholder='Description'
        />
      </label>
      <label>
        Album Art
        <input
          type='text'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          name='imageUrl'
          placeholder='Album art url'
        />
      </label>
      <button>Submit</button>
      <button onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  );
}

export default CreateAlbum
