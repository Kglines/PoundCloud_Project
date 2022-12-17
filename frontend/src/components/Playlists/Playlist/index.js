import React, { useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { Modal } from '../../../context/Modal';
import { fetchPlaylist } from '../../../store/playlists'
import DeletePlaylist from '../DeletePlaylist';
import EditPlaylist from '../EditPlaylist';
import './Playlist.css';

function Playlist() {
    const dispatch = useDispatch();
    const { playlistId } = useParams();

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const playlist = useSelector(state => state.playlists);
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchPlaylist(playlistId))
    }, [dispatch, playlistId])

    console.log('PLAYLIST IN PLAYLIST = ', playlist.previewImage)
  return (
    <div className='playlist-container'>
      <div className='playlist-detail-container'>
        <img
          className='song-detail-img'
          src={playlist?.previewImage}
          alt={playlist?.name}
        />
        {/* <h3>{playlist.title}</h3> */}

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
      </div>
      <div className='playlist-songs-container'>
        {playlist?.Songs?.map((song) => (
          <div className='playlist-songs' key={song.id}>
            <div className='playlist-songs-title'>
              <NavLink to={`/songs/${song.id}`}>
                <p key={song?.id}>{song?.title}</p>
              </NavLink>
            </div>
            <div>
              <ReactAudioPlayer className='audio-controls' controls />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist
