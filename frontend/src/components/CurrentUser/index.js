import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import { fetchAlbums } from '../../store/albums';
import './CurrentUser.css'
import CurrentuserAlbums from './CurrentuserAlbums';
import CurrentuserSongs from './CurrentuserSongs'
import CurrentuserPlaylists from './CurrentUserPlaylists';


function CurrentUser() {
  const dispatch = useDispatch();
  // const history = useHistory();

  
  
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
        dispatch(fetchAlbums());
        dispatch(fetchAllSongs());
    }, [dispatch]);

    if (!user) return <Redirect to='/login' />;

  return (
    <div>
      <div className='currentuser-container'>
        <div className='currentuser-banner'>
          <h2 className='currentuser-welcome-banner'>Welcome {user.username}!</h2>
        </div>
        {/* <h4 className='user-albums'>{user.username}'s Albums: </h4>
        <p className='user-albums-p'>
          <NavLink className='user-albums-btn' to='/currentuser/albums'>
            Click Here
          </NavLink>{' '}
          to see all of your albums...
        </p>
        <div className='user-album-container'>
          {albumList.length > 0 ? albumList.map((album) => (
            <div key={album.id} className='user-album-card'>
              <Link className='album-links' to={`/albums/${album.id}`}>
                <img
                  className='user-album-art'
                  src={album.previewImage}
                  alt={album.title}
                />
                <h4 className='album-title-home'>{album.title}</h4>
              </Link>
            </div>
          )) : <h3>No Albums Created Yet...</h3>}
        </div> */}
        <CurrentuserAlbums />
        {/* <h4 className='user-songs'>{user.username}'s Songs: </h4>
        <p className='user-songs-p'>
          <NavLink className='user-songs-btn' to='/currentuser/songs'>
            Click Here
          </NavLink>{' '}
          to see all of your songs...
        </p> */}
        
        <CurrentuserSongs />
        <CurrentuserPlaylists />
      </div>
    </div>
  );
}

export default CurrentUser
