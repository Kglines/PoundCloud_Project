import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { fetchPlaylists } from '../../../store/playlists';
import Card from '../../Card';
import CreatePlaylist from '../../Playlists/CreatePlaylist';
import './CurrentuserPlaylists.css';

function CurrentuserPlaylists() {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlists);
    const user = useSelector(state => state.session.user);
    const userPlaylists = [];

    useEffect(() => {
        dispatch(fetchPlaylists())
    }, [dispatch])

    playlists?.Playlists?.forEach(playlist => {
        if (playlist?.userId === user?.id) userPlaylists.push(playlist)
    })


  return (
    <div className='user-playlist-page-container'>
      <div className='user-playlist-header'>
        <h3 className='playlist-header'>My Playlists: </h3>
        {user && (
          <button
            className='user-add-playlist-btn'
            onClick={() => setShowModal(true)}
          >
            +Add Playlist
          </button>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreatePlaylist user={user} setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
      <div className='user-playlist-container'>
        {userPlaylists?.length > 0 ? (
          userPlaylists?.map((playlist) => (
            <div key={playlist?.id} className='song-card-home'>
            <Card id={playlist.id} title={playlist.name} description={playlist.User.username} previewImage={playlist.previewImage} url='playlists' />
            </div>
          ))
        ) : (
          <h3>No Playlists Created Yet...</h3>
        )}
      </div>
    </div>
  );
}

export default CurrentuserPlaylists
