import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSong } from '../../../store/songs';
import './SongDetails.css';
import EditSong from '../EditSong';
import DeleteSong from '../DeleteSong';

function SongDetails() {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs);
  const user = useSelector(state => state.session.user);
  const { Artist, Album } = songs;

  const [showEditForm, setShowEditForm] = useState(false);
  const [showDelForm, setShowDelForm] = useState(false);
  
  // console.log('Get a song = ', songs);

  useEffect(() => {
    dispatch(fetchSong(songId))
  }, [dispatch, songId])

  return (
    <>
      {user ? <NavLink to='/currentuser'>Back to My Music</NavLink> : <NavLink to='/songs'>Back to all songs</NavLink>}
      <div className='song-container'>
        <img className='song-img' src={songs?.previewImage} alt={songs.title} />
        <h2>{songs?.title}</h2>
        <p>{songs?.description}</p>
        <h4>{Artist?.username}</h4>
        <p>{Album?.title}</p>
      </div>
      {user && <button onClick={() => setShowEditForm(true)}>Edit</button>}

      {showEditForm && (
        <EditSong setShowEditForm={setShowEditForm} songId={songId} />
      )}
      {user && <button onClick={() => setShowDelForm(true)}>Delete</button>}

      {showDelForm && (
        <DeleteSong setShowDelForm={setShowDelForm} songId={songId} />
      )}
    </>
  );
}

export default SongDetails;
