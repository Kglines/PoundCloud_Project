import React from 'react'
import PlaylistListItem from '../PlaylistListItem'

function PlaylistList({ playlists }) {
    
  return (
    <div>
        {playlists?.Playlists?.map(playlist => (
            <div key={playlist.id}>
                <PlaylistListItem playlist={playlist} />
            </div>
        ))}
    </div>
  )
}

export default PlaylistList
