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
        <button className='my-btn' onClick={() => history.push('/currentuser')}>My Music</button>
        <ProfileButton className='profile-btn' user={sessionUser} />
      </>
    )
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to='/signup'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className='navbar'>
      <li>
        <NavLink className='home' exact to='/'>
          Home
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
