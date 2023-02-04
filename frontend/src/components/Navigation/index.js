// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <button id='my-music-btn' className='my-btn nav-link' onClick={() => history.push('/currentuser')}>My Music</button>
        <ProfileButton className='profile-btn nav-link' user={sessionUser} />
      </>
    )
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink className='nav-signup-btn nav-link' to='/signup'>
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <>
      <ul className='navbar'>
        <li className='navbar-items'>
          <NavLink className='home-icon nav-link' to='/'>
            <i className='fa-brands fa-soundcloud'></i>
          </NavLink>
          <a
            className='nav-link'
            target='_blank'
            href='https://github.com/Kglines/SoundCloud_Project'
          >
            About
          </a>
          <NavLink className='navbar-albums nav-link' to='/albums'>
            All Albums
          </NavLink>
          <NavLink className='navbar-songs nav-link' to='/songs'>
            All Songs
          </NavLink>
          <NavLink className='navbar-songs nav-link' to='/playlists'>
            All Playlists
          </NavLink>
          {isLoaded && sessionLinks}
          {/* <SearchBar className='nav-link'/> */}
        </li>
      </ul>
    </>
  );
}

export default Navigation;
