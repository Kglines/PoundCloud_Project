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
  
    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchAllSongs());
    }, [dispatch]);

    if (!user) return <Redirect to='/login' />;

  return (
    <div>
      <div className='currentuser-container'>
        <div className='currentuser-banner'>
          <h2 className='currentuser-welcome-banner'>Welcome {user.username}!</h2>
        </div>
        <CurrentuserAlbums />
        <CurrentuserSongs />
        <CurrentuserPlaylists />
      </div>
    </div>
  );
}

export default CurrentUser
