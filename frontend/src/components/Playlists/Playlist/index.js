import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlaylists } from '../../../store/playlists'

function Playlist() {
    const dispatch = useDispatch()
    const playlists = useSelector(state => state.playlists)

    useEffect(() => {
        dispatch(fetchPlaylists())
    }, [dispatch])

    // console.log('PLAYLISTS IN PLAYLIST = ', playlists)
  return (
    <div>Playlist</div>
  )
}

export default Playlist
