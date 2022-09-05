import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchAlbums } from '../../store/albums';
import { fetchAllSongs } from '../../store/songs';
import './Home.css';

function Home() {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const albums = Object.values(useSelector(state => state.albums));
  const songs = Object.values(useSelector(state => state.songs));

  const demoLogin = () => {
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
      .then(() => history.push('/currentuser'));
  }

  useEffect(() => {
    dispatch(fetchAlbums(albums));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllSongs(songs))
  }, [dispatch]);

  return (
    <>
      <div className='home-container'>
        <div className='album-banner-home'>
          <h2>Top Albums</h2>
          <p>Discover the best albums on SoundCloud</p>
        </div>
        <ol>
          <div className='album-container-home'>
            {albums.map((album) => {
              return (
                <div className='album-card-home'>
                  <li>
                    <NavLink
                      className='album-link-home'
                      to={`/albums/${album.id}`}
                    >
                      <h2 className='album-title-home'>{album.title}</h2>
                      <img
                        className='album-img-home'
                        src={album.previewImage}
                        alt={album.title}
                      />
                    </NavLink>
                    <p className='album-desc'>{album.description}</p>
                  </li>
                </div>
              );
            })}
          </div>
        </ol>
        <div className='song-banner-home'>
          <h2>Top Songs</h2>
          <p>The best hit music is on SoundCloud</p>
        </div>
        <ol>
          <div className='song-container-home'>
            {songs.map((song) => {
              return (
                <div className='song-card-home'>
                  <li>
                    <NavLink
                      className='song-link-home'
                      to={`/songs/${song.id}`}
                    >
                      <h2 className='song-title-home'>{song.title}</h2>
                      <img
                        className='song-img-home'
                        src={song.previewImage}
                        alt={song.title}
                      />
                    </NavLink>
                    <p className='song-desc-home'>{song.description}</p>
                  </li>
                </div>
              );
            })}
          </div>
        </ol>
      </div>
      <div className='right-container'>
        <h2>Join Our Community!</h2>
        <p>
          Click the <NavLink to='/login'>Login</NavLink> or the{' '}
          <NavLink to='/signup'>Signup</NavLink> links above <br></br> to see
          what the buzz is all about!
        </p>
        <p>OR</p>
        <p>Try it for yourself.</p>
        <p>Click the button below for a Demo login!</p>
        <button onClick={demoLogin}>DEMO USER</button>
      </div>
    </>
  );
}

export default Home
