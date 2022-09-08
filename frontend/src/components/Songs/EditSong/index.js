import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { fetchAlbums } from '../../../store/albums';
import { fetchSong, fetchEditSong } from '../../../store/songs';

function EditSong({ setShowEditModal, songId }) {
//   const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const albums = Object.values(useSelector((state) => state.albums));
  const song = useSelector((state) => state.songs);
  const myAlbums = [];

  // console.log('song = ', song)

  albums.forEach((album) => {
    if (album.userId === user.id) myAlbums.push(album);
  });

  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  const [imageUrl, setImageUrl] = useState(song.previewImage);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);

  // console.log('SELECTED ALBUM ID =', selectedAlbumId)

  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchSong());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);

    const payload = {
      id: songId,
      title,
      description,
      url,
      previewImage: imageUrl,
      albumId: selectedAlbumId,
    };

    dispatch(fetchEditSong(payload))
      .then(() => {
        setShowEditModal(false);
        history.push('/currentuser/songs')
        // return <Redirect to={`/currentuser/songs`} />;
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
    setDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit your song</h2>
      <ul>
        {validationErrors.length > 0 && validationErrors.map(error => (
          <li className='errors' key={error}>{error}</li>
        ))}
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
      <button disabled={disabled} type='submit'>Submit</button>
      <button onClick={() => setShowEditModal(false)}>Cancel</button>
    </form>
  );
}

export default EditSong;
