import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAlbums } from '../../store/albums';
import { fetchAllSongs } from '../../store/songs';
import './Home.css';
import { fetchPlaylists } from '../../store/playlists';
import DemoUser from '../DemoUser';

function Home() {
  const [validationErrors, setValidationErrors] = useState('')

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const albums = Object.values(useSelector(state => state.albums));
  const songs = Object.values(useSelector(state => state.songs));
  const playlists = useSelector(state => state.playlists)

  
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


  useEffect(() => {
    dispatch(fetchPlaylists()).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setValidationErrors(data.errors);
    });
  }, [dispatch])

  return (
    <>
      <div className='home-page'>
        <h1 className='home-page-title'>Welcome To PoundCloud</h1>
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
                validationErrors.map((error) => (
                  <li className='errors' key={error}>
                    {error}
                  </li>
                ))}
            </ul>
            <p>Discover the best head Pounding albums on PoundCloud</p>
          </div>
          <ol className='album-list-home'>
            <div className='album-container-home'>
              {albums.map((album) => {
                return (
                  <div key={album.id} className='album-card-home'>
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
            <p>The best head Pounding hit music is on PoundCloud</p>
          </div>
          <ol className='song-list-home'>
            <div className='song-container-home'>
              {songs.map((song) => {
                return (
                  <div key={song.id} className='song-card-home'>
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
          <div className='playlist-banner-home'>
            <h2>Top Playlists</h2>
            <p>The best head Pounding playlists are on PoundCloud</p>
          </div>
          <ol className='playlist-list-home'>
            <div className='playlist-container-home'>
              {playlists?.Playlists?.map((playlist) => (
                <div key={playlist?.id} className='playlist-card-home'>
                  <NavLink
                    className='playlist-link-home'
                    to={`/playlists/${playlist?.id}`}
                  >
                    <li className='playlist-item-home'>
                      <div>
                        <img
                          className='playlist-img-home'
                          src={playlist?.previewImage}
                          alt={playlist?.title}
                        />
                        <h2 className='playlist-title-home'>{playlist?.name}</h2>
                      </div>
                      <p className='playlist-desc-home'>{playlist?.User?.username}</p>
                    </li>
                  </NavLink>
                </div>
              ))}
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
            <div className='sidebar-intro'>
              <p>
                Click the <NavLink to='/login'>Login</NavLink> or the{' '}
                <NavLink to='/signup'>Signup</NavLink> links above <br></br> to
                see what the buzz is all about!
              </p>
              <p>OR</p>
              <p>Try it for yourself.</p>
              <p>Click the button below for a Demo login!</p>
              <DemoUser />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home
