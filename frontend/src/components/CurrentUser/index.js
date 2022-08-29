import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSongs } from '../../store/songs';

function CurrentUser() {
  // const dispatch = useDispatch();
  //   const currentUser = useSelector(state => state.session.user);

  //   const songs = Object.values(useSelector((state) => state.songs));


  //   useEffect(() => {
  //     dispatch(fetchAllSongs(songs));
  //   }, [dispatch]);

  //   const song = songs.find(song => song.userId === currentUser.id);
    
  return (
    <>
    <h2>Current User</h2>
      {/* <div>{currentUser.email}</div> */}
      {/* <h2>{song.title}</h2> */}
    </>
  )
}

export default CurrentUser
