import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAlbum, fetchEditAlbums } from '../../../store/albums';
import './EditAlbums.css';

function EditAlbums({ setShowEditModal, albumId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const album = useSelector((state) => state.albums);

    const [title, setTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description);
    const [imageUrl, setImageUrl] = useState(album.previewImage);
    const [validationErrors, setValidationErrors] = useState([])
    

    useEffect(() => {
      dispatch(fetchAlbum(albumId));
    }, [dispatch]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const payload = {
        id: albumId,
        title,
        description,
        imageUrl,
      };

      await dispatch(fetchEditAlbums(payload))
        .then(() => {
          setShowEditModal(false);
          history.push(`/currentuser/albums`);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setValidationErrors(data.errors);
        });
    }

  return (
    <form className='create-song-form' onSubmit={handleSubmit}>
      <div className='create-song-modal-header'>
        <h2>Edit your album</h2>
      </div>
      <div className='create-song-container'>
        <ul>
          {validationErrors.map((error) => (
            <li className='errors' key={error}>
              {error}
            </li>
          ))}
        </ul>
        <div className='song-labels-inputs'>
          <label>
            Title
            <input
              className='create-song-input'
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
              className='create-song-input'
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
              className='create-song-input'
              type='text'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              name='imageUrl'
              placeholder='Album art url'
            />
          </label>
        </div>
        <div className='.create-song-btns'>
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

export default EditAlbums
