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

   

    useEffect(() => {
      dispatch(fetchPlaylist(playlistId));
    }, [dispatch, playlistId]);

  return (
    <>
      <div className='playlist-container'>
        {user ? (
          <NavLink className='return-link' to='/currentuser/playlists'>
            Back to My Playlists
          </NavLink>
        ) : (
          <NavLink className='return-link' to='/playlists'>
            Back to all Playlists
          </NavLink>
        )}
        <div className='playlist-detail-container'>
          <div className='playlist-detail-data'>
            <div className='playlist-detail-info'>
              <h3>{playlist?.name}</h3>
              <p>
                Created by: <strong>{playlist?.User?.username}</strong>
              </p>
            </div>
            <div className='playlist-length'>
              {playlist?.Songs?.length}
              <p>Tracks</p>
            </div>
          </div>
          <div>
            {/* <h3>{playlist?.name}</h3> */}
            <img
              className='playlist-img'
              src={playlist?.previewImage}
              alt={playlist?.name}
            />

            <div className='playlist-btns'>
              {user && user?.id === playlist?.userId && (
                <div className='playtlist-btns-container'>
                  <button
                    className='playlist-edit-btn'
                    onClick={() => setShowEditModal(true)}
                  >
                    Edit
                  </button>
                  <button
                    className='playlist-delete-btn'
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
        </div>
        <div className='playlist-songs-container'>
          <div className='playlist-songs-add-song'>
            <h3>Song List:</h3>
            <AddToPlaylist
              playlistId={playlistId}
              user={user}
              playlist={playlist}
            />
          </div>
          <div>
            {playlist?.Songs?.map((song) => (
              <div className='playlist-songs' key={song?.id}>
                <div className='playlist-songs-title'>
                  <NavLink
                    className='playlist-songs-link'
                    to={`/songs/${song?.id}`}
                  >
                    <p key={song?.id}>{song?.title}</p>
                  </NavLink>
                </div>
                <div className='react-player-container'>
                  <ReactAudioPlayer
                    src={song?.url}
                    className='audio-controls'
                    controls
                  />
                  {user && user?.id === playlist?.userId && (
                    <RemoveFromPlaylist
                      song={song}
                      playlistId={playlistId}
                      playlistSongs={playlistSongs}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Playlist
