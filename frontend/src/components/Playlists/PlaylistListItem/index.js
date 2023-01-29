import React from 'react'
import { NavLink } from 'react-router-dom'
import './PlaylistItem.css'

function PlaylistListItem({ playlist }) {
  return (
      <NavLink className='playlist-link' to={`/playlists/${parseInt(playlist?.id)}`}>
        <div className='playlist-item'>
          <div>
            <img className='playlist-item-img' src={playlist?.previewImage} alt={playlist?.name} />
            <p className='playlist-item-title'>{playlist?.name}</p>
          </div>
            <p className='playlist-desc'> by: {playlist?.User?.username}</p>
        </div>
      </NavLink>
  );
}

export default PlaylistListItem
