import React from 'react'
import { NavLink } from 'react-router-dom'

function PlaylistListItem({ playlist }) {
   console.log('PLAYLIST', playlist)
  return (
    <div>
        <NavLink to={`/playlists/${playlist.id}`}>
            {playlist.name}
        </NavLink>
    </div>
  )
}

export default PlaylistListItem
