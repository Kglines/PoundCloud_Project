import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAlbums } from '../../store/albums';
import './Albums.css';

function Albums() {
  const dispatch = useDispatch();
  const albums = Object.values(useSelector(state => state.albums))

  useEffect(() => {
    dispatch(fetchAlbums(albums));
  }, [dispatch]);

  return (
    <>
      <h2>Albums</h2>
      {albums.map((album) => (
        <Link key={album.id} to={`/albums/${album.id}`}>
          <div>
            <h3>{album.title}</h3>
            <p>{album.description}</p>
            <img src={album.previewImage} alt={album.title} />
          </div>
        </Link>
      ))}
    </>
  );
}

export default Albums;
