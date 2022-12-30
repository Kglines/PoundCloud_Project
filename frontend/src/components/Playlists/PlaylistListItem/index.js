import React from 'react'
import { NavLink } from 'react-router-dom'

function PlaylistListItem({ playlist }) {
   
  return (
    <div className='playlist-card-home'>
      <NavLink className='playlist-link-home' to={`/playlists/${parseInt(playlist?.id)}`}>
        <div className='playlist-item-home'>
          <div>
            <img className='playlist-img-home' src={playlist?.previewImage} />
            <p className='playlist-title-home'>{playlist?.name}</p>
          </div>
            <p className='playlist-desc-home'> by: {playlist?.User?.username}</p>
        </div>
      </NavLink>
    </div>
  );
}

export default PlaylistListItem
