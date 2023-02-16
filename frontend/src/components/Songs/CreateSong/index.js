import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CreateSong.css'
import { fetchCreateSongs } from '../../../store/songs';
import { fetchAlbums } from '../../../store/albums';

function CreateSong({ setShowModal }) {
    const dispatch = useDispatch();

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
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);


    useEffect(() => {
        dispatch(fetchAlbums())
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            title,
            description,
            url,
            imageUrl,
            albumId: selectedAlbumId
        }
        
        const createdSong = await dispatch(fetchCreateSongs(payload))
            .then(() => {
              setIsLoading(false);
              setShowModal(false);
            })
            .catch(async (res) => {
              const data = await res.json();
              if (data && data.errors) setValidationErrors(data.errors);
        });
      
        return createdSong;
    }

    const updateFile = (e) => {
      const file = e.target.files[0];
      if (file) setUrl(file);
    };


  return (
    <form className='create-song-form' onSubmit={handleSubmit}>
      <div className='create-song-modal-header'>
        <h2>Create a Song</h2>
      </div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className='create-song-container'>
          <ul>
            {validationErrors.map((error) => (
              <li className='errors' key={error}>
                {error}
              </li>
            ))}
          </ul>
          <input
            className='create-song-input'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name='title'
            placeholder='Title'
          />
          <input
            className='create-song-input'
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name='description'
            placeholder='Description'
          />
          <input
            className='create-song-input'
            type='file'
            accept='audio/*'
            onChange={updateFile}
            name='url'
          />
          <input
            className='create-song-input'
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            name='imageUrl'
            placeholder='Image url'
          />
          <div className='select-album'>
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
          </div>
          <div className='create-song-btns'>
            <button className='submit-btn submit-song' type='submit'>
              Submit
            </button>
            <button className='cancel-btn cancel-song' onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default CreateSong
