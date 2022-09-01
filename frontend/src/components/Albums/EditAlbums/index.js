import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchAlbum, fetchEditAlbums } from '../../../store/albums';

function EditAlbums({ setShowForm }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams();
    const album = useSelector((state) => state.albums);

    console.log('album in edit', album.id, albumId);

    const [title, setTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description);
    const [imageUrl, setImageUrl] = useState(album.previewImage);
    // const [showForm, setShowForm] = useState(true);


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

        await dispatch(fetchEditAlbums(payload)).then(() => setShowForm(false));
    }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit your album</h2>
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
      <button>Save</button>
      <button onclick={() => setShowForm(false)}>Cancel</button>
    </form>
  );
}

export default EditAlbums
