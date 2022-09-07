import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import { fetchAlbums } from '../../store/albums';
import CreateAlbum from '../Albums/CreateAlbum';
import './CurrentUser.css';
import CreateSong from '../Songs/CreateSong';


function CurrentUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showCreateAlbumForm, setShowCreateAlbumForm] = useState(false);
  
  
  const user = useSelector((state) => state.session.user);
  const songs = Object.values(useSelector((state) => state.songs));
  const albums = Object.values(useSelector((state) => state.albums));
  
  const songList = [];
  const albumList = [];

  songs.forEach(async (song) => {
    if (song.userId === user.id) await songList.push(song);
  });

  albums.forEach(async (album) => {
    if (album.userId === user.id) await albumList.push(album);
  });
  
    useEffect(() => {
        dispatch(fetchAllSongs());
        dispatch(fetchAlbums());
    }, [dispatch]);

    console.log('songs  current user file = ', songs);

    if (!user) return <Redirect to='/login' />;

  return (
    <div>
      <div className='currentuser-container'>
        <div className='currentuser-banner'>
          <h2 className='welcome-banner'>Welcome {user.username}!</h2>
        </div>
        <h4 className='user-albums'>{user.username}'s Albums: </h4>
        <p className='user-albums-p'>
          <NavLink className='user-albums-btn' to='/currentuser/albums'>
            Click Here
          </NavLink>{' '}
          to see all of your albums...
        </p>
        <div className='user-album-container'>
          {albumList.map((album) => (
            <div className='album-card'>
              <Link
                className='album-links'
                key={album.id}
                to={`/albums/${album.id}`}
              >
                <img
                  className='album-img'
                  src={album.previewImage}
                  alt={album.title}
                />
                <h4 className='album-title-home'>{album.title}</h4>
                {/* <p>{album.description}</p> */}
              </Link>
            </div>
          ))}
        </div>
        <h4>{user.username}'s Songs: </h4>
        <p className='user-songs-p'>
          <NavLink className='user-songs-btn' to='/currentuser/songs'>
            Click Here
          </NavLink>{' '}
          to see all of your songs...
        </p>
        <div className='user-songs-container'>
          {songList.map((song) => (
            <div className='song-card'>
              <Link to={`/songs/${song.id}`}>
                <img
                  className='song-img'
                  src={song.previewImage}
                  alt={song.title}
                />
                <h4 className='song-title-home'>{song.title}</h4>
              </Link>
              {/* <p>{song.description}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CurrentUser
