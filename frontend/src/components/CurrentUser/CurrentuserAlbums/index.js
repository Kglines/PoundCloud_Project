import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums } from '../../../store/albums';
import { Link, Redirect } from 'react-router-dom';
import CreateAlbum from '../../Albums/CreateAlbum';
import { Modal } from '../../../context/Modal';
import './CurrentuserAlbums.css';
import { fetchGetUserAlbums } from '../../../store/currentUser';
import Card from '../../Card';

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

    useEffect(() => {
      dispatch(fetchGetUserAlbums());
    })

    if (!user) return <Redirect to='/login' />;

  return (
    <div className='user-album-page-container'>
      <div className='user-album-header'>
        <h3 className='album-header'>My Albums: </h3>
        {user && (
          <button
            className='user-add-album-btn'
            onClick={() => setShowModal(true)}
          >
            +Add Album
          </button>
        )}
      </div>
      <div className='user-album-container'>
        {albumList.length > 0 ? (
          albumList.map((album) => (
            <div key={album.id} className='song-card-home'>
              <Card id={album.id} title={album.title} description={album.description} previewImage={album.previewImage} url='albums' />
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
