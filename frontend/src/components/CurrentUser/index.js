import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSongs } from '../../store/songs';

function CurrentUser() {
    const dispatch = useDispatch();

    const songs = Object.values(useSelector(state => state.songs));
    const currentUser = useSelector(state => state.session.user);
    console.log(songs.map(song => song.userId === currentUser.id));
    const userSongs = [];

    

    useEffect(() => {
        dispatch(fetchAllSongs())
    }, [dispatch]);

  return (
    <div>CurrentUser</div>
  )
}

export default CurrentUser
