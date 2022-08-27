import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import SongDetails from './SongDetails';
import './Songs.css';

function Songs() {
    const dispatch = useDispatch();
    const songs = Object.values(useSelector((state) => state.songs));

    useEffect(() => {
      dispatch(fetchAllSongs(songs));
    }, [dispatch]);
  return (
    <>
      <h2 className='song-page'>Songs</h2>
      {songs.map((song) => (
        <Link key={song.id} to={`/songs/${song.id}`}>
          {/* <SongDetails songs={songs} /> */}
          <h3>{song.title}</h3>
          <p>{song.description}</p>
          {/* <img src={song.previewImage} alt={song.title} /> */}
        </Link>
      ))}
    </>
  );
}

export default Songs
