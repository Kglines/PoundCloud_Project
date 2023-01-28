import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './AlbumDetails.css';
import { fetchAlbum } from '../../../store/albums';
import EditAlbums from '../EditAlbums';
import DeleteAlbum from '../DeleteAlbum';
import { Modal } from '../../../context/Modal';
import ReactAudioPlayer from 'react-audio-player';

function AlbumDetails() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
    const { albumId } = useParams();
    const dispatch = useDispatch();
    const album = useSelector(state => state.albums)
    const sessionUser = useSelector(state => state.session.user);
    // const userAlbum = sessionUser.id === album.userId;
    const { Artist, Songs } = album;
    
    useEffect(() => {
      dispatch(fetchAlbum(albumId))
    }, [dispatch, albumId]);
    
  return (
    <>
      {sessionUser ? (
        <NavLink className='return-link' to='/currentuser/albums'>
          Back to My Albums
        </NavLink>
      ) : (
        <NavLink className='return-link' to='/albums'>
          Back to all albums
        </NavLink>
      )}

      <div className='album-detail-container'>
        <div className='album-detail-card'>
          <div className='album-side'>
            <img
              className='album-detail-img'
              src={album.previewImage}
              alt={album.title}
            />
            <h3>{album.title}</h3>
            <p>{album.description}</p>
          </div>
          <div className='songs-side'>
            <h4>Artist: {Artist?.username}</h4>
            <h4>Songs: </h4>
            <div className='album-detail-song-list'>
              {Songs &&
                Songs.map((song) => (
                  <div key={song.id} className='album-detail-song-container'>
                    <div className='album-detail-song-item'>
                      <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                    </div>
                    <div>
                      <ReactAudioPlayer
                        className='album-audio-player'
                        src={song?.url}
                        controls
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className='album-detail-btns'>
          {sessionUser && sessionUser.id === album.userId && (
            <button
              className='save-btn'
              disabled={sessionUser.id !== album.userId}
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </button>
          )}
          {sessionUser && sessionUser.id === album.userId && (
            <button
              className='cancel-btn'
              disabled={sessionUser.id !== album.userId}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          )}

          {showEditModal && (
            <Modal>
              <EditAlbums
                setShowEditModal={setShowEditModal}
                albumId={albumId}
              />
            </Modal>
          )}
          {showDeleteModal && (
            <Modal>
              <DeleteAlbum
                setShowDeleteModal={setShowDeleteModal}
                albumId={albumId}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}

export default AlbumDetails;
