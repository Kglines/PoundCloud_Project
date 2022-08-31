import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import { fetchAlbums } from '../../store/albums';
import './CurrentUser.css';

function CurrentUser() {
    const dispatch = useDispatch();
    const history = useHistory();

    const songs = Object.values(useSelector(state => state.songs));
    const albums = Object.values(useSelector(state => state.albums));
    const user = useSelector(state => state.session.user);

    const songList = [];
    const albumList = [];

    // It's not recognizing my user right away...do I need to make this async?
    songs.forEach(song => {
        if(song.userId === user.id) songList.push(song)
    });
    albums.forEach(album => {
        if (album.userId === user.id) albumList.push(album)
    });
    
    console.log(songList, albumList);
    // useEffect(() => {
    //     if(!currentUser) history.push('/')
    // })

    useEffect(() => {
        dispatch(fetchAllSongs())
        dispatch(fetchAlbums());
    }, [dispatch]);

  return (
    <div>
        <h2 className='welcome-banner'>Welcome {user.username}!</h2>
        <h3 className='user-albums'>{user.username}'s Albums: </h3>
        {albumList.map(album => (
            <div className='album-link-card'>
            <NavLink className='album-links' key={album.id} to={`/albums/${album.id}`}>
                <h4>{album.title}</h4>
                <p>{album.description}</p>
            </NavLink>
                <button>Edit</button>
            </div>
        ))}
        <h3>My Songs: </h3>
        {songList.map(song => (
            <>
                <h4>{song.title}</h4>
                <p>{song.description}</p>
            </>
        ))}

    </div>
  )
}

export default CurrentUser
