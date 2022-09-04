import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAlbums } from '../../store/albums';
import { fetchAllSongs } from '../../store/songs';
import './Home.css';

function Home() {
  const dispatch = useDispatch();
  const albums = Object.values(useSelector(state => state.albums));
  const songs = Object.values(useSelector(state => state.songs));

  useEffect(() => {
    dispatch(fetchAlbums(albums));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllSongs(songs))
  }, [dispatch]);

  return (
    <div className='home-container'>
      <h2>Top Albums</h2>
      <p>The best albums on SoundCloud</p>
        <ol>
          <div className='album-container-home'>
            {albums.map((album) => {
              return (
                <div className='album-card'>
                  <li>
                    <NavLink className='album-link' to={`/albums/${album.id}`}>
                      <h2 className='album-title'>{album.title}</h2>
                      <img
                        className='album-img'
                        src={album.previewImage}
                        alt={album.title}
                      />
                    </NavLink>
                    <p className='album-desc'>{album.description}</p>
                  </li>
                </div>
              );
            })}
          </div>
        </ol>
      <h2>Top Songs</h2>
      <p>The best hit music is on SoundCloud</p>
        <ol>
      <div className='song-container-home'>
          {songs.map((song) => {
            return (
              <div className='song-card'>
                <li>
                  <NavLink className='song-link' to={`/songs/${song.id}`}>
                    <h2 className='song-title'>{song.title}</h2>
                    <img className='song-img' src={song.previewImage} alt={song.title} />
                  </NavLink>
                  <p className='song-desc'>{song.description}</p>
                </li>
              </div>
            );
          })}
      </div>
        </ol>
    </div>
  );
}

export default Home
