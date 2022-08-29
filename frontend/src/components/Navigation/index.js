// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
// import CurrentUser from '../CurrentUser';
// import Home from '../Home';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <>
//         <ProfileButton user={sessionUser} />
//         <CurrentUser />
//       </>
    
//     );
//   } else {
//     sessionLinks = (
//       <>
//         <LoginFormModal />
//         <NavLink className='signup-link' to='/signup'>Sign Up</NavLink>
//         <Home />
//       </>
//     );
//   }

//   return (
//     <ul className='navbar'>
//       <li className='nav-items'>
//         <NavLink className='nav-links' exact to='/'>
//           Home
//         </NavLink>
//         {isLoaded && sessionLinks}
//       </li>
//     </ul>
//   );
// }

// export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} className='profile-btn' />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to='/signup'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className='nav'>
      <li className='nav-item'>
        <NavLink className='nav-link' exact to='/'>
          Home
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
