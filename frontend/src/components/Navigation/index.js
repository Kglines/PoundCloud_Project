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
      <NavLink id='home-icon' className='home-icon' to='/'>
        <i className='fa-brands fa-soundcloud'></i>
      </NavLink>
      <input type='checkbox' id='nav-toggle' className='nav-toggle' />
      <nav className='navbar'>
        <ul>
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
              <ProfileButton
                className='profile-btn nav-link'
                user={sessionUser}
              />
            </li>
          )}

          <li className='navbar-items'>
            <a
              id='nav-about'
              rel='noreferrer'
              className='nav-link'
              target='_blank'
              href='https://github.com/Kglines/SoundCloud_Project'
            >
              About
            </a>
          </li>
        </ul>
      </nav>
      <label for='nav-toggle' className='nav-toggle-label'>
        <span></span>
      </label>
    </header>
  );
}

export default Navigation;
