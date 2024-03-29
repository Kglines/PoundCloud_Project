import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchEditSong } from '../../../store/songs';

function EditSong({ setShowEditModal }) {
  const { songId } = useParams();
  const parsedId = parseInt(songId, 10);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const albums = Object.values(useSelector((state) => state.albums));
  const song = useSelector((state) => state.songs);
  const myAlbums = [];

  albums.forEach((album) => {
    if (album.userId === user.id) myAlbums.push(album);
  });

  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  const [imageUrl, setImageUrl] = useState(song.previewImage);
  const [validationErrors, setValidationErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    

    const payload = {
      id: parsedId,
      title,
      description,
      url,
      imageUrl,
    };

    const newSong = dispatch(fetchEditSong(payload))
      .then(() => {
        setShowEditModal(false);
        history.push(`/songs/${songId}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
    return newSong;
  };

  return (
    <form className='create-song-form' onSubmit={handleSubmit}>
      <div className='create-song-modal-header'>
        <h2>Edit Your Song</h2>
      </div>
      <div className='create-song-container'>
        <ul>
          {validationErrors.length > 0 &&
            validationErrors.map((error) => (
              <li className='errors' key={error}>
                {error}
              </li>
            ))}
        </ul>
        <div className='song-labels-inputs'>
          <label>
            Title
            <input
              type='text'
              className='create-song-input'
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
              className='create-song-input'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name='description'
              placeholder='Description'
            />
          </label>
          
          <label>
            Image Url
            <input
              type='text'
              className='create-song-input'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              name='imageUrl'
              placeholder='Image url'
            />
          </label>
        </div>
        
        <div>
          <button className='submit-btn submit-song' type='submit'>
            Submit
          </button>
          <button
            className='cancel-btn cancel-song'
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditSong;
