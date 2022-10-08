import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums } from '../../../store/albums';
import { Link, Redirect } from 'react-router-dom';
import CreateAlbum from '../../Albums/CreateAlbum';
import { Modal } from '../../../context/Modal';

function CurrentuserAlbums() {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const albums = Object.values(useSelector(state => state.albums));
    const user = useSelector((state) => state.session.user);

    const albumList = [];

    albums.forEach(async (album) => {
      if (album.userId === user.id) await albumList.push(album);
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
          className='user-add-album-btn'
          onClick={() => setShowModal(true)}
        >
          +Add Album
        </button>
      )}
      <div className='user-album-container'>
        {albumList.length > 0 ? (
          albumList.map((album) => (
            <div key={album.id} className='user-album-card'>
              <Link
                className='album-links'
                key={album.id}
                to={`/albums/${album.id}`}
              >
                <img
                  className='user-album-art'
                  src={album.previewImage}
                  alt={album.title}
                />
                <h4 className='album-title-home'>{album.title}</h4>
              </Link>
              <p>{album.description}</p>
            </div>
          ))
        ) : (
          <h3>No Albums Created Yet...</h3>
        )}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateAlbum setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default CurrentuserAlbums
