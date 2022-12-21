import React from 'react'
import { NavLink } from 'react-router-dom'

function PlaylistListItem({ playlist }) {
   console.log('PLAYLIST', playlist)
  return (
    <div className='playlist-card-home'>
      <NavLink className='playlist-link-home' to={`/playlists/${playlist.id}`}>
        <div className='playlist-item-home'>
          <div>
            <img className='playlist-img-home' src={playlist.previewImage} />
            <div className='playlist-desc-home'>{playlist.User.username}</div>
          </div>
          <p className='playlist-title-home'>{playlist.name}</p>
        </div>
      </NavLink>
    </div>
  );
}

export default PlaylistListItem
