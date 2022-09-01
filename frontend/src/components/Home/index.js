import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbums } from '../../store/albums';
import { fetchAllSongs } from '../../store/songs';
import AlbumDetails from '../Albums/AlbumDetails';
import SongDetails from '../Songs/SongDetails';
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
    <div>
      <h2>Top Albums</h2>
      <p>The best albums on SoundCloud</p>
      <ol>
        {albums.map(album => {
          return ( 
              <li>
                <img src={album.previewImage} alt={album.title} />
                <h2>{album.title}</h2>
                <p>{album.description}</p>
              </li>
          )
        })}

      </ol>
      <h2>Top Songs</h2>
      <p>The best hit music is on SoundCloud</p>
      <ol>
        {songs.map(song => {
          return (
            <li>
              <SongDetails />
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Home
