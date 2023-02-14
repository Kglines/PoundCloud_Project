import React from 'react'
import { NavLink } from 'react-router-dom'
import './PlaylistItem.css'

function PlaylistListItem({ playlist }) {
  return (
      <NavLink className='playlist-link' to={`/playlists/${parseInt(playlist?.id)}`}>
        <div className='playlist-item'>
          <div>
            <img className='playlist-img-home' src={playlist?.previewImage} alt={playlist?.name} />
            <p className='playlist-title-home'>{playlist?.name}</p>
          </div>
            <p className='playlist-desc-home'> by: {playlist?.User?.username}</p>
        </div>
      </NavLink>
  );
}

export default PlaylistListItem
