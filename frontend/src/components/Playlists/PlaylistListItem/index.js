import React from 'react'
import { NavLink } from 'react-router-dom'
import './PlaylistItem.css'

function PlaylistListItem({ playlist }) {
   
  return (
    // <div className='playlist-card'>
      <NavLink className='playlist-link' to={`/playlists/${parseInt(playlist?.id)}`}>
        <div className='playlist-item'>
          <div>
            <img className='playlist-img' src={playlist?.previewImage} alt={playlist?.name} />
            <p className='playlist-title'>{playlist?.name}</p>
          </div>
            <p className='playlist-desc'> by: {playlist?.User?.username}</p>
        </div>
      </NavLink>
    // </div>
  );
}

export default PlaylistListItem
