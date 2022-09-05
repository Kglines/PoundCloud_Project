import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
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
        <div className='album-container'>
          <div className='currentuser-banner'>
            <h2 className='welcome-banner'>Welcome {user.username}!</h2>
            <h3 className='user-albums'>{user.username}'s Albums: </h3>
            
          </div>
          {albumList.map((album) => (
            <div className='album-link-card'>
              <Link
                className='album-links'
                key={album.id}
                to={`/albums/${album.id}`}
              >
                <img
                  className='album-art'
                  src={album.previewImage}
                  alt={album.title}
                />
                <h4>{album.title}</h4>
                <p>{album.description}</p>
              </Link>
            </div>
          ))}
          <button onClick={() => history.push('/currentuser/albums')}>
            My Albums
          </button>
        </div>
        <div className='songs-container'>
          <h3>My Songs: </h3>

          {songList.map((song) => (
            <div className='song-card'>
              <Link to={`/songs/${song.id}`}>
                <img
                  className='song-img'
                  src={song.previewImage}
                  alt={song.title}
                />
                <h4>{song.title}</h4>
              </Link>
              <p>{song.description}</p>
            </div>
          ))}
          <button onClick={() => history.push('/currentuser/songs')}>
            My Songs
          </button>
        </div>
      </div>

      
    </div>
  );
}

export default CurrentUser
