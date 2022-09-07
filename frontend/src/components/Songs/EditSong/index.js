import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { fetchAlbums } from '../../../store/albums';
import { fetchSong, fetchEditSong } from '../../../store/songs';

function EditSong({ setShowEditForm, setShowForm, songId }) {
//   const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const albums = Object.values(useSelector((state) => state.albums));
  const song = useSelector((state) => state.songs);
  const myAlbums = [];

  console.log('song = ', song)

  albums.forEach((album) => {
    if (album.userId === user.id) myAlbums.push(album);
  });

  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  const [imageUrl, setImageUrl] = useState(song.previewImage);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [validationErros, setValidationErrors] = useState([]);

  console.log('SELECTED ALBUM ID =', selectedAlbumId)

  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchSong());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: songId,
      title,
      description,
      url,
      previewImage: imageUrl,
      albumId: selectedAlbumId,
    };

    dispatch(fetchEditSong(payload))
    setShowEditForm(false);
    // return <Redirect to={`/songs/${song.id}`} />
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit your song</h2>
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
      <button type='submit'>Submit</button>
      <button onClick={() => setShowEditForm(false)}>Cancel</button>
    </form>
  );
}

export default EditSong;
