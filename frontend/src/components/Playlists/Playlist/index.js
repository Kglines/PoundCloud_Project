import React, { useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { Modal } from '../../../context/Modal';
import { fetchAddToPlaylist, fetchPlaylist, fetchRemoveFromPlaylist } from '../../../store/playlists'
import { fetchCreatePlaylistSong, fetchPlaylistSongs } from '../../../store/playlistSongs';
import { fetchAllSongs } from '../../../store/songs';
import DeletePlaylist from '../DeletePlaylist';
import EditPlaylist from '../EditPlaylist';
import AddToPlaylist from './AddToPlaylist';
import './Playlist.css';
import RemoveFromPlaylist from './RemoveFromPlaylist';

function Playlist() {
    const dispatch = useDispatch();
    const { playlistId } = useParams();

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    
    const [errors, setErrors] = useState([])

    const playlist = useSelector(state => state.playlists);
    const user = useSelector(state => state.session.user);
    const allSongs = Object.values(useSelector(state => state.songs));
    const playlistSongs = useSelector(state => state.playlistSongs)
   

    useEffect(() => {
      dispatch(fetchPlaylistSongs(playlistId))
    }, [dispatch, playlistId, playlistSongs?.id])

    useEffect(() => {
      dispatch(fetchAllSongs())
    }, [dispatch])

    

    // const removeFromPlaylist = async (song) => {
    //   const res = await dispatch(fetchRemoveFromPlaylist(song, playlistId))
    //   .then(() => dispatch(fetchPlaylist(playlistId)))
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   });
    //   // return res;
    // };

    useEffect(() => {
      dispatch(fetchPlaylist(playlistId));
    }, [dispatch, playlistId]);

  return (
    <div className='playlist-container'>
      <div className='playlist-detail-container'>
        <img
          className='song-detail-img'
          src={playlist?.previewImage}
          alt={playlist?.name}
        />
        <h3>{playlist?.name}</h3>

        <div className='playlist-btns'>
          {user && user?.id === playlist?.userId && (
            <div>
              <button
                className='save-btn'
                onClick={() => setShowEditModal(true)}
              >
                Edit
              </button>
              <button
                className='cancel-btn'
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          )}
          {showEditModal && (
            <Modal onClose={() => setShowEditModal(false)}>
              <EditPlaylist
                setShowEditModal={setShowEditModal}
                playlist={playlist}
              />
            </Modal>
          )}
          {showDeleteModal && (
            <Modal onClose={() => setShowDeleteModal(false)}>
              <DeletePlaylist
                playlist={playlist}
                setShowDeleteModal={setShowDeleteModal}
              />
            </Modal>
          )}
        </div>
        <AddToPlaylist playlistId={playlistId} user={user} playlist={playlist} />
      </div>
      <div className='playlist-songs-container'>
        {playlist?.Songs?.map((song) => (
          <div className='playlist-songs' key={song?.id}>
            <div className='playlist-songs-title'>
              <NavLink to={`/songs/${song?.id}`}>
                <p key={song?.id}>{song?.title}</p>
              </NavLink>
            </div>
            <div>
              <ReactAudioPlayer
                src={song?.url}
                className='audio-controls'
                controls
              />
            </div>
              {/* <button onClick={() => removeFromPlaylist(song)}>X</button> */}
              <RemoveFromPlaylist song={song} playlistId={playlistId} playlistSongs={playlistSongs} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist
