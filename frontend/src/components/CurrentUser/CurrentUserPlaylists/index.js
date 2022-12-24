import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchPlaylists } from '../../../store/playlists';

function CurrentuserPlaylists() {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlists);
    const user = useSelector(state => state.session.user);
    const userPlaylists = [];

    console.log('PLAYLISTS in CURRENT USER PLAYLISTS = ', playlists)

    useEffect(() => {
        dispatch(fetchPlaylists())
    }, [dispatch])

    playlists?.Playlists?.forEach(playlist => {
        if (playlist?.userId === user?.id) userPlaylists.push(playlist)
    })

    console.log('LIST', userPlaylists)

  return (
    <div>
      <h3>My Playlists: </h3>
      {user && <button>+Add Playlist</button>}
      <div>
        {userPlaylists.length > 0 ? (
          userPlaylists.map((playlist) => (
            <div key={playlist.id}>
              <NavLink to={`/playlists/${playlist.id}`}>
                <img className='user-album-art' src={playlist.previewImage} alt={playlist.name} />
                <h4>{playlist.name}</h4>
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
