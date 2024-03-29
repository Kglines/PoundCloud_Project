// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push('/');
  };

  return (
    <>
      <button
        id='profile-btn'
        className='profile-btn navbar-item'
        onClick={openMenu}
        // onClick={() => history.push('/currentuser')}
      >
        <i className='fas fa-user-circle' />
        {/* {showMenu ? (
          <i class='fa-sharp fa-solid fa-chevron-up'></i>
        ) : (
          <i class='fa-sharp fa-solid fa-chevron-down'></i>
        )} */}
      </button>
      {showMenu && (
        <ul className='profile-dropdown'>
          {/* <li>{user.username}</li>
          <li>{user.email}</li> */}
          {/* <li>
            <NavLink className='nav-album-link' to='/currentuser/albums'>
              My Albums
            </NavLink>
          </li>
          <li>
            <NavLink className='nav-song-link' to='/currentuser/songs'>
              My Songs
            </NavLink>
          </li>
          <li>
            <NavLink className='nav-song-link' to='/currentuser/playlists'>
              My Playlists
            </NavLink>
          </li> */}
          <li>
            <NavLink className='dropdown-link' to='/currentuser'>
              Profile
            </NavLink>
          </li>
          <li>
            {/* <button className='logout-btn' onClick={logout}>
              Log Out
            </button> */}
            <NavLink className='dropdown-link' onClick={logout} to='/'>
              LOG OUT
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
