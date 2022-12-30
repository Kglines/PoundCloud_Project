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
    <div>
      {user && user.id === playlist?.userId && (
        <form onSubmit={addToPlaylist}>
            <select
            value={selectSong}
            onChange={(e) => setSelectSong(e.target.value)}
            >
            {allSongs?.map((song) => (
                <option key={song?.id} value={song?.id}>
                {song?.title}
                </option>
            ))}
            </select>
            <button>Add to Playlist</button>
        </form>
      )}
    </div>
  );
}

export default AddToPlaylist
