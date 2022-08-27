import React from 'react'
import { useSelector } from 'react-redux';

function CurrentUser() {
    const currentUser = useSelector(state => state.session.user);
    console.log('current user = ', currentUser);
    
  return (
    <div>CurrentUser</div>
  )
}

export default CurrentUser
