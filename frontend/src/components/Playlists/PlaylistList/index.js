import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlaylists } from '../../../store/playlists'
import PlaylistListItem from '../PlaylistListItem'
import './PlaylistList.css';

function PlaylistList({ playlists }) {

  const dispatch = useDispatch()

  const lists = useSelector(state => state.playlists)

  useEffect(() => {
    dispatch(fetchPlaylists())
  }, [dispatch])
    
  return (
    <div>
      <h2 className='playlist-list-header'>PoundCloud Playlists</h2>
      <div className='playlist-list-container'>
        {playlists
          ? playlists?.Playlists?.map((playlist) => (
              <div className='playlist-card' key={playlist?.id}>
                <PlaylistListItem playlist={playlist} />
              </div>
            ))
          : lists?.Playlists?.map((playlist) => (
              <div className='playlist-card' key={playlist?.id}>
                <PlaylistListItem playlist={playlist} />
              </div>
            ))}
      </div>
    </div>
  );
}

export default PlaylistList
