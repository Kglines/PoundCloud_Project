import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums } from '../../../store/albums';
import { Link, Redirect } from 'react-router-dom';
import CreateAlbum from '../../Albums/CreateAlbum';

function CurrentuserAlbums() {
    const [showCreateAlbumForm, setShowCreateAlbumForm] = useState(false);
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

    if (!user) return <Redirect to='/login' />;

  return (
    <div>
      <h3 className='album-header'>My Albums: </h3>
      {user && (
        <button
          className='create-album-btn'
          onClick={() => setShowCreateAlbumForm(true)}
        >
          Add Album
        </button>
      )}
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
              <h4 className='album-title-home'>{album.title}</h4>
            </Link>
            <p>{album.description}</p>
          </div>
        ))}
      </div>
      {showCreateAlbumForm && (
        <CreateAlbum setShowCreateAlbumForm={setShowCreateAlbumForm} />
      )}
    </div>
  );
}

export default CurrentuserAlbums
