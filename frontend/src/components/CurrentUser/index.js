import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import { fetchAlbums } from '../../store/albums';
import './CurrentUser.css'
import { Modal } from '../../context/Modal';
import CreateSong from '../Songs/CreateSong';
import CreateAlbum from '../Albums/CreateAlbum';
import CreatePlaylist from '../Playlists/CreatePlaylist';
import {fetchGetUserAlbums, fetchGetUserPlaylists, fetchGetUserSongs} from '../../store/currentUser';
import Card from '../Card';
import SmallCard from '../SmallCard';


function CurrentUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [songs, setSongs] = useState([]);
  const [songCount, setSongCount] = useState(0);
  const [albums, setAlbums] = useState([]);
  const [albumCount, setAlbumCount] = useState(0);
  const [playlists, setPlaylists] = useState([]);
  const [playlistCount, setPlaylistCount] = useState(0);

  const [showSongModal, setShowSongModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch('/api/currentuser/songs')
      const res = await dispatch(fetchGetUserSongs());
      // const songs = await res.json()
      setSongs(res.Songs)
      setSongCount(res.songCount)
    }
    fetchData()
  }, [dispatch])



  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch('/api/currentuser/albums')
      const res = await dispatch(fetchGetUserAlbums())
      // const count = await res.json();

      setAlbums(res.Albums)
      setAlbumCount(res.albumCount)
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch('/api/currentuser/playlists')
      const res = await dispatch(fetchGetUserPlaylists());
      // const count = await res.json()

      setPlaylists(res.Playlists)
      setPlaylistCount(res.playlistCount)
    }
    fetchData()
  }, [dispatch])
  
  
    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchAllSongs());
    }, [dispatch]);

    if (!user) return <Redirect to='/login' />;

  return (
    <div className='current-user-page'>
      <div className='currentuser-container'>
        <div className='currentuser-banner'>
          <div className='currentuser-welcome-banner'>
            <h2>Welcome {user.username}!</h2>
            <p>
              <strong>{songCount} </strong>
              <NavLink
                to='/currentuser/songs'
                className='current-user-nav-link'
              >
                songs
              </NavLink>
            </p>
            <p>
              <strong>{albumCount} </strong>
              <NavLink
                className='current-user-nav-link'
                to='/currentuser/albums'
              >
                albums
              </NavLink>
            </p>
            <p>
              <strong>{playlistCount}</strong>{' '}
              <NavLink
                className='current-user-nav-link'
                to='/currentuser/playlists'
              >
                playlists
              </NavLink>
            </p>
          </div>
        </div>
        <div className='curr-user-summary-songs'>
          <div className='user-song-header'>
            <h3>My Songs: </h3>
            <button
              className='user-add-song-btn'
              onClick={() => setShowSongModal(true)}
            >
              +Add Song
            </button>
            {showSongModal && (
              <Modal
                className='create-song-modal'
                onClose={() => setShowSongModal(false)}
              >
                <CreateSong setShowModal={setShowSongModal} />
              </Modal>
            )}
          </div>
          <div className='curr-user-summary-songs-container'>
            {songs.map((song) => (
              <div key={song.id} className=''>
                <SmallCard id={song.id} title={song.title} description={song.description} previewImage={song.previewImage} url='songs' />
              </div>
            ))}
          </div>
        </div>
        <div className='curr-user-summary-albums'>
            <div className='user-album-header'>
              <h3>My Albums: </h3>
              {user && (
                <button
                  className='user-add-album-btn'
                  onClick={() => setShowAlbumModal(true)}
                >
                  +Add Album
                </button>
              )}
            </div>
          
          {showAlbumModal && (
            <Modal onClose={() => setShowAlbumModal(false)}>
              <CreateAlbum setShowModal={setShowAlbumModal} />
            </Modal>
          )}
          <div className='curr-user-summary-albums-container'>
            {albums?.map((album) => (
              <div key={album.id} className='song-card-home'>
              <SmallCard id={album.id} title={album.title} description={album.description} previewImage={album.previewImage} url='albums' />
              </div>
            ))}
          </div>
        </div>
        {/* <CurrentuserPlaylists /> */}
        <div className='curr-user-summary-playlist'>
          <div className='user-playlist-header'>
            <h3 className='playlist-header'>My Playlists: </h3>
            {user && (
              <button
                className='user-add-playlist-btn'
                onClick={() => setShowPlaylistModal(true)}
              >
                +Add Playlist
              </button>
            )}
            {showPlaylistModal && (
              <Modal onClose={() => setShowPlaylistModal(false)}>
                <CreatePlaylist
                  user={user}
                  setShowModal={setShowPlaylistModal}
                />
              </Modal>
            )}
          </div>
          <div className='curr-user-summary-playlist-container'>
            {playlists.map((playlist) => (
              <div key={playlist?.id} className='song-card-home'>
                <SmallCard id={playlist.id} title={playlist.name} description={playlist.name} previewImage={playlist.previewImage} url='playlists' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentUser
