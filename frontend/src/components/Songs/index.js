import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import './Songs.css';

function Songs() {
  const dispatch = useDispatch();
  const songs = Object.values(useSelector((state) => state.songs));
  // console.log('songs = ', songs);
  const [showCreateSong, setShowCreateSong] = useState(false)

  useEffect(() => {
    dispatch(fetchAllSongs(songs));
  }, [dispatch]);

  return (
    <div>
      <h2 className='song-header'>SoundCloud Songs</h2>
      <div className='song-container'>
        {songs.map((song) => (
          <div className='song-card'>
            <NavLink 
              className='song-link' 
              key={song.id} 
              to={`/songs/${song.id}`}
              >
              <div className='song-banner'>
                <img className='song-img' src={song.previewImage} alt={song.title} />
                <h3 className='song-title'>{song.title}</h3>
              </div>
            </NavLink>
              <p className='song-desc'>{song.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Songs;
