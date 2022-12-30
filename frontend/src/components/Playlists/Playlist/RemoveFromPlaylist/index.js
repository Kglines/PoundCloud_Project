import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchDeletePlaylistSong, fetchPlaylistSongs } from '../../../../store/playlistSongs'
import { fetchPlaylist } from '../../../../store/playlists'
import { useEffect } from 'react';

function RemoveFromPlaylist({ song, playlistId }) {
  const dispatch = useDispatch();

  const [playlistSongs, setPlaylistSongs] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchPlaylistSongs(playlistId))
      setPlaylistSongs(data)
    }
    fetchData()
  }, [dispatch])

  
  const [errors, setErrors] = useState([])

  const theSong = playlistSongs?.songs?.find(songA => songA?.songId === song?.id)


  const removeFromList = async () => {
    const res = await dispatch(fetchDeletePlaylistSong(theSong))
      .then(() => dispatch(fetchPlaylist(playlistId)))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    return res;
  };
  return (
    <div>
      <button onClick={() => removeFromList()}>X</button>
    </div>
  );
}

export default RemoveFromPlaylist
