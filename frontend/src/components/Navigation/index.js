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
        <i class='fa-solid fa-bars'></i>
        <li className='navbar-items'>
          <NavLink id='home-icon' className='home-icon nav-link' to='/'>
            <i className='fa-brands fa-soundcloud'></i>
          </NavLink>

          {/* <SearchBar className='nav-link'/> */}
        </li>
        <li className='navbar-items'>
          <a
            className='nav-link'
            target='_blank'
            href='https://github.com/Kglines/SoundCloud_Project'
          >
            About
          </a>
        </li>
        <li className='navbar-items'>
          <NavLink className='navbar-albums nav-link' to='/albums'>
            All Albums
          </NavLink>
        </li>
        <li className='navbar-items'>
          <NavLink className='navbar-songs nav-link' to='/songs'>
            All Songs
          </NavLink>
        </li>
        <li className='navbar-items'>
          {' '}
          <NavLink className='navbar-songs nav-link' to='/playlists'>
            All Playlists
          </NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </>
  );
}

export default Navigation;
