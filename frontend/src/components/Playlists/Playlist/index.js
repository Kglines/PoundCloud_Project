import React, { useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { Modal } from '../../../context/Modal';
import { fetchAddToPlaylist, fetchPlaylist } from '../../../store/playlists'
import { fetchAllSongs } from '../../../store/songs';
import DeletePlaylist from '../DeletePlaylist';
import EditPlaylist from '../EditPlaylist';
import './Playlist.css';

function Playlist() {
    const dispatch = useDispatch();
    const { playlistId } = useParams();

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectSong, setSelectSong] = useState('')
    const [errors, setErrors] = useState([])

    console.log('SELECTED SONG = ', selectSong)

    const playlist = useSelector(state => state.playlists);
    const user = useSelector(state => state.session.user);
    const allSongs = Object.values(useSelector(state => state.songs));

    console.log('ALL SONGS = ', allSongs)

    useEffect(() => {
        dispatch(fetchPlaylist(playlistId))
    }, [dispatch, playlistId])

    useEffect(() => {
      dispatch(fetchAllSongs())
    }, [dispatch])

    const addToPlaylist = async (e) => {
      e.preventDefault();

      const payload = {
        songId: parseInt(selectSong)
      }

      console.log('PAYLOAD IN PLAYLIST COMPONENT = ', payload)

      const res = await dispatch(fetchAddToPlaylist(payload, playlistId))
        .then(() => dispatch(fetchPlaylist(playlistId)))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
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
        {user && user?.id === playlist?.userId && (
          <div>
            <form onSubmit={addToPlaylist}>
              <select
                value={selectSong}
                onChange={(e) => setSelectSong(e.target.value)}
              >
                {allSongs?.map((song) => (
                  <option key={song?.id} value={song?.id}>
                    {song?.title}
                  </option>
                ))}
              </select>
              <button>Add to Playlist</button>
            </form>
          </div>
        )}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist
