import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import { fetchAlbums } from '../../store/albums';
import './CurrentUser.css'
import CurrentuserAlbums from './CurrentuserAlbums';
import CurrentuserSongs from './CurrentuserSongs'
import CurrentuserPlaylists from './CurrentUserPlaylists';
import { fetchGetUserSongs } from '../../store/currentUser';


function CurrentUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [songs, setSongs] = useState([]);
  const [songCount, setSongCount] = useState(0);
  const [album, setAlbum] = useState('');
  const [albumCount, setAlbumCount] = useState(0);
  const [playlist, setPlaylist] = useState('');
  const [playlistCount, setPlaylistCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/currentuser/songs')
      const songs = await res.json()
      setSongs(songs.Songs)
      setSongCount(songs.songCount)
    }
    fetchData()
  }, [dispatch])



  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/currentuser/albums')
      const count = await res.json()
      setAlbum(count.Album)
      setAlbumCount(count.albumCount)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/currentuser/playlists')
      const count = await res.json()
      setPlaylist(count.Playlist)
      setPlaylistCount(count.playlistCount)
    }
    fetchData()
  }, [])
  
  
    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchAllSongs());
    }, [dispatch]);

    if (!user) return <Redirect to='/login' />;

  return (
    <div>
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
        {/* <CurrentuserSongs /> */}
        {/* <div className='user-song-header'>
          <h3>My Songs: </h3>
          <button
            className='user-add-song-btn'
            onClick={() => setShowModal(true)}
          >
            +Add Song
          </button>
          {showModal && (
            <Modal
              className='create-song-modal'
              onClose={() => setShowModal(false)}
            >
              <CreateSong setShowModal={setShowModal} />
            </Modal>
          )}
        </div> */}
        <div className='curr-user-summary-songs-container'>
          {songs.map((song) => (
            <div key={song.id} className=''>
              <div className='song-card'>
                <Link className='song-link' to={`/songs/${song.id}`}>
                  <div className='song-banner'>
                    <img
                      className='song-img'
                      src={song.previewImage}
                      alt={song.title}
                    />
                    <h4 className='song-title-home'>{song.title}</h4>
                  </div>
                </Link>
                <p>{song.description}</p>
              </div>
            </div>
          ))}
        </div>
        <CurrentuserAlbums />
        <CurrentuserPlaylists />
      </div>
    </div>
  );
}

export default CurrentUser
