import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums } from '../../../store/albums';
import { Link } from 'react-router-dom';

function CurrentuserAlbums() {
    const dispatch = useDispatch();
    const albums = Object.values(useSelector(state => state.albums));
    const user = useSelector((state) => state.session.user);

    const albumList = [];

    albums.forEach((album) => {
      if (album.userId === user.id) albumList.push(album);
    });

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch])

  return (
    <div>
      <h3 className='album-header'>My Albums: </h3>
      <div className='user-album-container'>
        {albumList.map((album) => (
          <div className='album-link-card'>
            <Link
              className='album-links'
              key={album.id}
              to={`/albums/${album.id}`}
            >
              <img
                className='album-art'
                src={album.previewImage}
                alt={album.title}
              />
              <h4>{album.title}</h4>
              <p>{album.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentuserAlbums
