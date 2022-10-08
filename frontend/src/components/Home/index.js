import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchAlbums } from '../../store/albums';
import { fetchAllSongs } from '../../store/songs';
import './Home.css';

function Home() {
  const [validationErrors, setValidationErrors] = useState('')

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const albums = Object.values(useSelector(state => state.albums));
  const songs = Object.values(useSelector(state => state.songs));

  // console.log('home page albums', albums)

  const demoLogin = () => {
    return dispatch(
      sessionActions.login({ credential: 'Demo-lition', password: 'password' })
    )
      .then(() => history.push('/currentuser'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
  }

  useEffect(() => {
    dispatch(fetchAlbums(albums)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setValidationErrors(data.errors);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllSongs(songs)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setValidationErrors(data.errors);
    });
  }, [dispatch]);

  return (
    <>
      <div className='home-page'>
        <h1 className='home-page-title'>Welcome To SoundCloud</h1>
        <img
          className='home-banner-img'
          src='https://images.unsplash.com/photo-1483821838526-8d9756a6e1ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2768&q=80'
          alt='Credit Greyson Joralemon'
        />
        <div className='home-container'>
          <div className='album-banner-home'>
            <h2>Top Albums</h2>
            <ul>
              {validationErrors.length > 0 &&
                validationErrors.map((error) => 
                  <li className='errors' key={error}>{error}</li>)}

            </ul>
            <p>Discover the best albums on SoundCloud</p>
          </div>
          <ol>
            <div className='album-container-home'>
              {albums.map((album) => {
                return (
                  <div className='album-card-home'>
                      <NavLink
                        className='album-link-home'
                        to={`/albums/${album.id}`}
                      >
                    <li className='album-item-home'>
                    <div>
                        <img
                          className='album-img-home'
                          src={album.previewImage}
                          alt={album.title}
                        />
                        <h4 className='album-title-home'>{album.title}</h4>

                    </div>
                      <p className='album-desc-home'>{album.description}</p>
                    </li>
                      </NavLink>
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
                      <NavLink
                        className='song-link-home'
                        to={`/songs/${song.id}`}
                      >
                    <li className='song-item-home'>
                    <div>
                        <img
                          className='song-img-home'
                          src={song.previewImage}
                          alt={song.title}
                        />
                        <h2 className='song-title-home'>{song.title}</h2>

                    </div>
                      <p className='song-desc-home'>{song.description}</p>
                    </li>
                      </NavLink>
                  </div>
                );
              })}
            </div>
          </ol>
        </div>
        <div className='right-container'>
          <h3>Join Our Community!</h3>
          <div className='media-links'>
            <a target='_blank' href='https://twitter.com/SoundCloud'>
              <i className='fa-brands fa-square-twitter'></i>
            </a>
            <a target='_blank' href='https://www.facebook.com/SoundCloud'>
              <i className='fa-brands fa-square-facebook'></i>
            </a>
            <a target='_blank' href='https://www.instagram.com/soundcloud/'>
              <i className='fa-brands fa-square-instagram'></i>
            </a>
          </div>
          {!user && (
            <>
              <p>
                Click the <NavLink to='/login'>Login</NavLink> or the{' '}
                <NavLink to='/signup'>Signup</NavLink> links above <br></br> to
                see what the buzz is all about!
              </p>
              <p>OR</p>
              <p>Try it for yourself.</p>
              <p>Click the button below for a Demo login!</p>
              <button className='demo-btn' onClick={demoLogin}>DEMO USER</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home
