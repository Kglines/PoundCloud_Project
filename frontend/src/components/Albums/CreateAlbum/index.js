import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCreateAlbums } from '../../../store/albums';
import { useHistory } from 'react-router-dom';
import './CreateAlbum.css';

function CreateAlbum({ setShowCreateAlbumForm }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // useEffect(() => {

    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            imageUrl
        }
        let createdAlbum = await dispatch(fetchCreateAlbums(payload));

        if(createdAlbum){
            setTitle('');
            setDescription('');
            setImageUrl('');
        }
        history.push(`/albums/${createdAlbum.id}/song`)
    }

  return (
    <form onSubmit={handleSubmit}>
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
      <button onClick={() => setShowCreateAlbumForm(false)}>Cancel</button>
    </form>
  );
}

export default CreateAlbum
