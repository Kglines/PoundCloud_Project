import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSong } from '../../../store/songs';
import './SongDetails.css';

function SongDetails() {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs);
  const { Artist, Album } = songs;
  
  console.log('Get a song = ', songs);

  useEffect(() => {
    dispatch(fetchSong(songId))
  }, [dispatch, songId])

  return (
    <>
    <NavLink to='/currentuser'>Back to My Music</NavLink>
      <div className='song-container'>
        <img className='song-img' src={songs?.previewImage} alt={songs.title} />
        <h2>{songs?.title}</h2>
        <p>{songs?.description}</p>
        <h4>{Artist?.username}</h4>
        <p>{Album?.title}</p>
      </div>
    </>
  )
}

export default SongDetails;
