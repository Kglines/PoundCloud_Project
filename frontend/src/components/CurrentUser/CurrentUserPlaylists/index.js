import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { fetchPlaylists } from '../../../store/playlists';
import CreatePlaylist from '../../Playlists/CreatePlaylist';

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
    <div>
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
      <div className='user-playlist-container'>
        {userPlaylists?.length > 0 ? (
          userPlaylists?.map((playlist) => (
            <div key={playlist?.id} className='song-card'>
              <NavLink className='playlist-links' to={`/playlists/${playlist?.id}`}>
                <img
                  className='song-img'
                  src={playlist?.previewImage}
                  alt={playlist?.name}
                />
                <h4 className='playlist-title-home'>{playlist?.name}</h4>
              </NavLink>
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
