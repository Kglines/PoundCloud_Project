import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchAlbums } from '../../../store/albums';
import { fetchSong, fetchEditSong } from '../../../store/songs';

function SongForm({ setShowModal }) {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const albums = Object.values(useSelector((state) => state.albums));
  const song = useSelector(state => state.songs);
  const myAlbums = [];

  albums.forEach((album) => {
    if (album.userId === user.id) myAlbums.push(album);
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedAlbumId, setSelectedAlbumId] = useState();
  const [validationErros, setValidationErrors] = useState([]);

  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchSong());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      url,
      imageUrl,
      albumId: selectedAlbumId,
    };

    return dispatch(fetchEditSong(payload)).then(() => {
      history.push(`/currentuser`);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a song</h2>
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
      <label>
        Select Album
        <select
          value={selectedAlbumId}
          onChange={(e) => setSelectedAlbumId(e.target.value)}
        >
          {myAlbums.map((album) => (
            <option selected key={album.id} value={album.id}>
              {album.title}
            </option>
          ))}
        </select>
      </label>
      <button type='submit'>Submit</button>
      <button onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  );
}

export default SongForm
