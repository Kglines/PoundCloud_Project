import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CreateSong.css'
import { fetchCreateSongs } from '../../../store/songs';
import { fetchAlbums } from '../../../store/albums';

function CreateSong({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const albums = Object.values(useSelector(state => state.albums));
    const myAlbums = [];
    
    albums.forEach((album) => {
        if (album.userId === user.id) myAlbums.push(album);
    });
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [addToAlbum, setAddToAlbum] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    


    useEffect(() => {
        dispatch(fetchAlbums())
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            url,
            imageUrl,
            albumId: selectedAlbumId
        }

        const createdSong = await dispatch(fetchCreateSongs(payload))
            .then(() => {
              setShowModal(false);
            })
            .catch(async (res) => {
              const data = await res.json();
              if (data && data.errors) setValidationErrors(data.errors);
        });
      
        return createdSong;
    }

    console.log('errors on create song page', validationErrors)

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a song</h2>
      <ul>
        {validationErrors.map((error) => 
            <li className='errors' key={error}>{error}</li>
        )}
      </ul>
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
        Song Url
        <input
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          name='url'
          placeholder='Song url'
        />
      </label>
      <label>
        Image Url
        <input
          type='text'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          name='imageUrl'
          placeholder='Image url'
        />
      </label>

      {myAlbums.map((album) => (
        <label key={album.id}>
          <input
            type='button'
            value={album.id}
            onClick={(e) => setSelectedAlbumId(e.target.value)}
            className='select-album-input'
          ></input>
          {album.title}
        </label>
      ))}

      <button type='submit'>
        Submit
      </button>
      <button onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  );
}

export default CreateSong
