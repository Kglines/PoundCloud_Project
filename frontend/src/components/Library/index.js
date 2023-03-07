import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAlbums } from '../../store/albums';
import { fetchPlaylists } from '../../store/playlists';
import { fetchAllSongs } from '../../store/songs';
import SearchBar from '../SearchBar';
import Card from '../Card';
import './Library.css';


const Library = () => {
    const dispatch = useDispatch();

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([])
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const songs = await dispatch(fetchAllSongs());
            setSongs(songs);
        }
        fetchData()
    }, [dispatch])

    useEffect(() => {
        const fetchData = async () => {
            const albums =  await dispatch(fetchAlbums())
            setAlbums(albums)
        }
        fetchData()
    }, [dispatch])

    useEffect(() => {
        const fetchData = async () => {
            const playlists = await dispatch(fetchPlaylists())
            setPlaylists(playlists)
        }
        fetchData()
    }, [dispatch])


  return (
    <div className='library-container'>
      <div className='library-welcome-banner'>
        <h2>Library of Music</h2>
        <div className='library-search'>
          <SearchBar />
        </div>
      </div>
      <div className='curr-user-summary-songs'>
        <div className='user-song-header'>
          <h3>
            <NavLink to='/songs'>Songs:</NavLink>
          </h3>
        </div>
        <div className='song-container-home'>
          {songs?.Songs?.map((song) => {
            return (
              <div key={song?.id} className='song-card-home'>
                <Card id={song.id} title={song.title} description={song.description} previewImage={song.previewImage} url='songs' />
              </div>
            );
          })}
        </div>
      </div>
      <div className='curr-user-summary-albums'>
        <div className='user-album-header'>
          <h3>
            <NavLink to='/albums'>Albums:</NavLink>
          </h3>
        </div>
        <div className='song-container-home'>
          {albums?.Albums?.map((album) => {
            return (
              <div key={album?.id} className='song-card-home'>
                <Card id={album.id} title={album.title} description={album.description} previewImage={album.previewImage} url='albums' />
              </div>
            );
          })}
        </div>
      </div>
      <div className='curr-user-summary-playlist'>
        <div className='user-playlist-header'>
          <h3>
            <NavLink to='/playlists'>Playlists:</NavLink>
          </h3>
        </div>
        <div className='song-container-home'>
          {playlists?.Playlists?.map((playlist) => {
            return (
              <div key={playlist?.id} className='song-card-home'>
                <Card id={playlist.id} title={playlist.name} description={playlist.User.username} previewImage={playlist.previewImage} url='playlists' />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Library

