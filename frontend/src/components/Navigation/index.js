// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const history = useHistory()
  const dispatch = useDispatch()
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push('/');
  };

  return (
    <header>
      {/* <ul className='navbar'>
        <i class='fa-solid fa-bars'></i>
        <li className='navbar-items'>
          <NavLink id='home-icon' className='home-icon nav-link' to='/'>
            <i className='fa-brands fa-soundcloud'></i>
          </NavLink>

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
      </ul> */}
      <NavLink id='home-icon' className='home-icon nav-link' to='/'>
        <i className='fa-brands fa-soundcloud'></i>
      </NavLink>
      <input type='checkbox' id='nav-toggle' className='nav-toggle' />
      <nav className='navbar'>
        <ul>
          {/* <li className='navbar-items'>
          </li> */}
          <li className='navbar-items'>
            <a
              className='nav-link'
              target='_blank'
              href='https://github.com/Kglines/SoundCloud_Project'
            >
              About
            </a>
          </li>
          {!sessionUser && (
            <li className='navbar-items'>
              <LoginFormModal />
            </li>
          )}
          {!sessionUser && (
            <li className='navbar-items'>
              <NavLink className='nav-link' to='/signup'>
                Sign Up
              </NavLink>
            </li>
          )}
          {sessionUser && (
            <li className='navbar-items'>
              {/* <ProfileButton
                className='profile-btn nav-link'
                user={sessionUser}
              /> */}
              <NavLink className='nav-link' to='/currentUser'>
                Profile
              </NavLink>
            </li>
          )}
          {sessionUser && (
            <li>
              {/* <button className='logout-btn' onClick={logout}>
                LOG OUT
              </button> */}
              <NavLink className='nav-link' to='/' onClick={logout}>log out</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <label for='nav-toggle' className='nav-toggle-label'>
        <span></span>
      </label>
    </header>
  );
}

export default Navigation;
