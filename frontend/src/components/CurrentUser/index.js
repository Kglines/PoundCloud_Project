import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import { fetchAlbums } from '../../store/albums';
import './CurrentUser.css';
import AlbumDetails from '../Albums/AlbumDetails';

function CurrentUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const songs = Object.values(useSelector((state) => state.songs));
  const albums = Object.values(useSelector((state) => state.albums));
  const user = useSelector((state) => state.session.user);
  
  const songList = [];
  const albumList = [];
  
  songs.forEach((song) => {
      if (song.userId === user.id) songList.push(song);
    });

  albums.forEach((album) => {
        if (album.userId === user.id) albumList.push(album);
    });
            
    useEffect(() => {
        dispatch(fetchAllSongs());
        dispatch(fetchAlbums());
    }, [dispatch]);

    if (!user) return <Redirect to='/' />;

  return (
    <div>
      <h2 className='welcome-banner'>Welcome {user.username}!</h2>
      <h3 className='user-albums'>{user.username}'s Albums: </h3>
      {albumList.map((album) => (
        <div className='album-link-card'>
          <Link
            className='album-links'
            key={album.id}
            to={`/albums/${album.id}`}
          >
            <img src={album.previewImage} />
            <h4>{album.title}</h4>
            <p>{album.description}</p>
            {/* <AlbumDetails /> */}
          </Link>
          
        </div>
      ))}
      <h3>My Songs: </h3>
      {songList.map((song) => (
        <Link to={`/songs/${song.id}`}>
          <h4>{song.title}</h4>
          <p>{song.description}</p>
        </Link>
      ))}
    </div>
  );
}

export default CurrentUser
