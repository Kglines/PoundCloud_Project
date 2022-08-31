import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAlbums } from '../../store/albums';
import AlbumDetails from './AlbumDetails';
import './Albums.css';
import CreateAlbum from './CreateAlbum';

function Albums() {
  const dispatch = useDispatch();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const albums = Object.values(useSelector(state => state.albums));

  useEffect(() => {
    dispatch(fetchAlbums(albums));
  }, [dispatch]);

  return (
    <>
      <h2>Albums</h2>
      {albums.map((album) => (
        <Link key={album.id} to={`/albums/${album.id}`}>
          {/* <div>
            <h3>{album.title}</h3>
            <p>{album.description}</p>
            <img src={album.previewImage} alt={album.title} />
          </div> */}
          <AlbumDetails />
        </Link>
      ))}
      <button onClick={() => setShowCreateForm(true)}>Create Album</button>
      {showCreateForm && (
        
          <CreateAlbum />
        
      )}
    </>
  );
}

export default Albums;
