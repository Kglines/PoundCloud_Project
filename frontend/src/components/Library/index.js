import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAlbums } from '../../store/albums';
import { fetchPlaylists } from '../../store/playlists';
import { fetchAllSongs } from '../../store/songs';
import SearchBar from '../SearchBar';
import './Library.css';


const Library = () => {
    const dispatch = useDispatch();
    const songs = Object.values(useSelector(state => state.songs));
    const albums = Object.values(useSelector(state => state.albums));
    const playlists = useSelector(state => state.playlists.Playlists)

    console.log('PL =', playlists);

    useEffect(() => {
        const fetchData = async () => {
            return await dispatch(fetchAllSongs());
        }
        fetchData()
    }, [dispatch])

    useEffect(() => {
        const fetchData = async () => {
            return await dispatch(fetchAlbums())
        }
        fetchData()
    }, [dispatch])

    useEffect(() => {
        const fetchData = async () => {
            return await dispatch(fetchPlaylists())
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
          {songs?.map((song) => {
            return (
              <div key={song?.id} className='song-card-home'>
                <NavLink className='song-link-home' to={`/songs/${song?.id}`}>
                  <li className='song-item-home'>
                    <div>
                      <img
                        className='song-img-home'
                        src={song?.previewImage}
                        alt={song?.title}
                      />
                      <h2 className='song-title-home'>{song?.title}</h2>
                    </div>
                    <p className='song-desc-home'>{song?.description}</p>
                  </li>
                </NavLink>
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
          {albums?.map((album) => {
            return (
              <div key={album?.id} className='song-card-home'>
                <NavLink className='song-link-home' to={`/albums/${album?.id}`}>
                  <li className='song-item-home'>
                    <div>
                      <img
                        className='song-img-home'
                        src={album?.previewImage}
                        alt={album?.title}
                      />
                      <h2 className='song-title-home'>{album?.title}</h2>
                    </div>
                    <p className='song-desc-home'>{album?.description}</p>
                  </li>
                </NavLink>
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
          {playlists?.map((playlist) => {
            return (
              <div key={playlist?.id} className='song-card-home'>
                <NavLink
                  className='song-link-home'
                  to={`/playlists/${playlist?.id}`}
                >
                  <li className='song-item-home'>
                    <div>
                      <img
                        className='song-img-home'
                        src={playlist?.previewImage}
                        alt={playlist?.title}
                      />
                      <h2 className='song-title-home'>{playlist?.name}</h2>
                    </div>
                    <p className='song-desc-home'>{playlist?.User?.username}</p>
                  </li>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Library
