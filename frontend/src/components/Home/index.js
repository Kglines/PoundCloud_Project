import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAlbums } from '../../store/albums';
import { fetchAllSongs } from '../../store/songs';
import './Home.css';
import { fetchPlaylists } from '../../store/playlists';
import DemoUser from '../DemoUser';
import SearchBar  from '../SearchBar';
import Footer from '../Footer';

function Home() {
  const [validationErrors, setValidationErrors] = useState('')
  const [songs, setSongs] = useState([]);
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const albums = Object.values(useSelector(state => state.albums));
  // const songs = Object.values(useSelector(state => state.songs));
  const playlists = useSelector(state => state.playlists)

  
  
  useEffect(() => {
    dispatch(fetchAlbums(albums)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setValidationErrors(data.errors);
    });
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchAllSongs(songs)).catch(async (res) => {
  //     const data = await res.json();
  //     if (data && data.errors) setValidationErrors(data.errors);
  //   });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/songs`)
      const songs = await res.json()
      setSongs(songs)
    }
    fetchData()
  }, [])


  useEffect(() => {
    dispatch(fetchPlaylists()).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setValidationErrors(data.errors);
    });
  }, [dispatch])

  return (
    <div className='home-page-container'>
      <div className='home-page'>
        <h1 className='home-page-title'>Welcome To PoundCloud</h1>
        <img
          className='home-banner-img'
          src='https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
          alt='Credit Aditya Chinchure'
        />
        
        <div className='search-container'>
          <p className='search-title'>
            Search for the <strong>BEST</strong> head-Pounding music on
            PoundCloud
          </p>
          <SearchBar />
          <p className='search-popular'>Popular head-Pounding songs:</p>
          <div className='song-container-home'>
            {songs?.Songs?.map((song) => {
              return (
                <div key={song?.id} className='song-card-home'>
                  <NavLink className='song-link-home' to={`/songs/${song?.id}`}>
                    <li className='song-item-home'>
                      <div>
                        <img
                          className='song-img-home'
                          src={song?.previewImage}
                          alt={song?.title}
                        />
                        <h2 className='song-title-home'>{song?.title}</h2>
                      </div>
                      <p className='song-desc-home'>{song?.description}</p>
                    </li>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
        <div className='right-container'>
          {/* <h3>Join Our Community!</h3>
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
          </div> */}
          {/* {!user && (
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
          )} */}
        </div>
      </div>
        {/* <Footer /> */}
    </div>
  );
}

export default Home
