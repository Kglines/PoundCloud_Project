import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchAlbum, fetchEditAlbums } from '../../../store/albums';
import './EditAlbums.css';

function EditAlbums({ setShowEditModal, albumId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { albumId } = useParams();
    const album = useSelector((state) => state.albums);
    // const {Artist, Songs} = album;

    const [title, setTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description);
    const [imageUrl, setImageUrl] = useState(album.previewImage);
    const [ Artist, setArtist] = useState(album.Artist);
    const [Songs, setSongs] = useState(album.Songs)
    // const [songDetails, setSongDetails] = useState(Songs);
    // const [artistDetails, setArtistDetails] = useState(Artist);
    // const [showModal, setShowModal] = useState(true);
    const [validationErrors, setValidationErrors] = useState([])
    console.log('SONGS on edit album page', Songs, 'ARTIST on edit page', Artist)

    useEffect(() => {
      dispatch(fetchAlbum(albumId));
    }, [dispatch]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const payload = {
        id: albumId,
        title,
        description,
        previewImage: imageUrl,
        // Artist: album.userId,
        // Songs: album.Songs
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
    <form className='edit-form' onSubmit={handleSubmit}>
      <h2 className='edit-form-header'>Edit your album</h2>
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
      <div className='edit-album-btns'>
        <button className='edit-album-save'>Save</button>
        <button className='edit-album-cancel' onclick={() => setShowEditModal(false)}>Cancel</button>
      </div>
    </form>
  );
}

export default EditAlbums
