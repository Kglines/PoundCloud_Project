import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchAlbum, fetchEditAlbums } from '../../../store/albums';
import './EditAlbums.css';

function EditAlbums({ setShowForm, albumId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { albumId } = useParams();
    const album = useSelector((state) => state.albums);
    const {Artist, Songs} = album;

    const [title, setTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description);
    const [imageUrl, setImageUrl] = useState(album.previewImage);
    // const [songDetails, setSongDetails] = useState(Songs);
    // const [artistDetails, setArtistDetails] = useState(Artist);
    // const [showForm, setShowForm] = useState(true);
    console.log('albumId on edit album page', album)

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
        Artist,
        Songs
      };

      let editedAlbum = await dispatch(fetchEditAlbums(payload));

      if(editedAlbum){
        setShowForm(false);
        setTitle(album.title);
        setDescription(album.description);
        setImageUrl(album.previewImage);
        // setArtistDetails(Artist);
        // setSongDetails(Songs);
      }
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
        <button className='edit-album-cancel' onclick={() => setShowForm(false)}>Cancel</button>
      </div>
    </form>
  );
}

export default EditAlbums
