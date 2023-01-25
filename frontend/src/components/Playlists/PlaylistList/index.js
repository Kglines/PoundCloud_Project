import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlaylists } from '../../../store/playlists'
import PlaylistListItem from '../PlaylistListItem'

function PlaylistList({ playlists }) {

  const dispatch = useDispatch()

  const lists = useSelector(state => state.playlists)

  useEffect(() => {
    dispatch(fetchPlaylists())
  }, [dispatch])
    
  return (
    <div className='playlist-container-home'>
    <h2>PoundCloud Playlists</h2>
      {playlists
        ? playlists?.Playlists?.map((playlist) => (
            <div key={playlist?.id}>
              <PlaylistListItem playlist={playlist} />
            </div>
          ))
        : lists?.Playlists?.map((playlist) => (
            <div key={playlist?.id}>
              <PlaylistListItem playlist={playlist} />
            </div>
          ))}
    </div>
  );
}

export default PlaylistList
