import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import { fetchAlbums } from '../../store/albums';

function CurrentUser() {
    const dispatch = useDispatch();
    const history = useHistory();

    const songs = Object.values(useSelector(state => state.songs));
    const albums = Object.values(useSelector(state => state.albums));
    const user = useSelector(state => state.session.user);

    const songList = [];
    const albumList = [];

    songs.find(song => {
        if(song.userId === user.id) songList.push(song)
    });
    albums.find(album => {
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
        <h2>{user.firstName}-{user.lastName}</h2>
        <h3>Albums:</h3>
        {albumList.map(album => (
            <>
                <h4>{album.title}</h4>
                <p>{album.description}</p>
            </>
        ))}
        <h3>Songs</h3>
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
