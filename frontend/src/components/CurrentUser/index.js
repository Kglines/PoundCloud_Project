import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import { fetchAlbums } from '../../store/albums';
import './CurrentUser.css'
import CurrentuserAlbums from './CurrentuserAlbums';
import CurrentuserSongs from './CurrentuserSongs'
import CurrentuserPlaylists from './CurrentUserPlaylists';


function CurrentUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [songCount, setSongCount] = useState(0);
  const [albumCount, setAlbumCount] = useState(0);
  const [playlistCount, setPlaylistCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/currentuser/songs')
      const count = await res.json()
      setSongCount(count.songCount)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/currentuser/albums')
      const count = await res.json()
      setAlbumCount(count.albumCount)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/currentuser/playlists')
      const count = await res.json()
      setPlaylistCount(count.playlistCount)
    }
    fetchData()
  }, [])
  
  
    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchAllSongs());
    }, [dispatch]);

    if (!user) return <Redirect to='/login' />;

  return (
    <div>
      <div className='currentuser-container'>
        <div className='currentuser-banner'>
          <div className='currentuser-welcome-banner'>
            <h2>Welcome {user.username}!</h2>
            <p>
              <strong>{songCount} </strong>
              <NavLink
                to='/currentuser/songs'
                className='current-user-nav-link'
              >
                songs
              </NavLink>
            </p>
            <p>
              <strong>{albumCount} </strong>
              <NavLink
                className='current-user-nav-link'
                to='/currentuser/albums'
              >
                albums
              </NavLink>
            </p>
            <p>
              <strong>{playlistCount}</strong>{' '}
              <NavLink
                className='current-user-nav-link'
                to='/currentuser/playlists'
              >
                playlists
              </NavLink>
            </p>
          </div>
        </div>
        <CurrentuserAlbums />
        <CurrentuserSongs />
        <CurrentuserPlaylists />
      </div>
    </div>
  );
}

export default CurrentUser
