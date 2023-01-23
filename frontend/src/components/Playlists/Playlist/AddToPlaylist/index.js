import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreatePlaylistSong } from '../../../../store/playlistSongs';
import { fetchPlaylist } from '../../../../store/playlists';

function AddToPlaylist({ playlistId, user, playlist }) {

    const dispatch = useDispatch()

    const allSongs = Object.values(useSelector(state => state.songs));

    const [selectSong, setSelectSong] = useState(1);
    const [errors, setErrors] = useState([]);


    const addToPlaylist = async (e) => {
      e.preventDefault();

      const payload = {
        playlistId: parseInt(playlistId),
        songId: parseInt(selectSong),
      };

      const res = await dispatch(
        fetchCreatePlaylistSong(payload)
      )
        .then(() => dispatch(fetchPlaylist(playlistId)))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
      return res;
    };
  return (
    <div className='add-to-playlist-container'>
      {user && user.id === playlist?.userId && (
        <form className='add-to-playlist-form' onSubmit={addToPlaylist}>
            <select
            value={selectSong}
            onChange={(e) => setSelectSong(e.target.value)}
            className='add-to-playlist-select'
            >
            {allSongs?.map((song) => (
                <option className='add-to-playlist-options' key={song?.id} value={song?.id}>
                {song?.title}
                </option>
            ))}
            </select>
            <button className='add-to-playlist-btn'>+Add to Playlist</button>
        </form>
      )}
    </div>
  );
}

export default AddToPlaylist
