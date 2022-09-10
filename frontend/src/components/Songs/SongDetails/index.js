import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSong } from '../../../store/songs';
import './SongDetails.css';
import EditSong from '../EditSong';
import DeleteSong from '../DeleteSong';
import { Modal } from '../../../context/Modal';

function SongDetails() {
  const { songId } = useParams();
  const parsedId = parseInt(songId, 10);
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs);
  const user = useSelector(state => state.session.user);
  // const userSong = user.id === songs.userId;
  const { Artist, Album } = songs;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);


  useEffect(() => {
    dispatch(fetchSong(parsedId))
  }, [dispatch, parsedId])

  return (
    <>
      {user ? (
        <NavLink className='return-link' to='/currentuser/songs'>
          Back to My Songs
        </NavLink>
      ) : (
        <NavLink className='return-link' to='/songs'>
          Back to all songs
        </NavLink>
      )}
      <div className='song-detail-container'>
        <img
          className='song-detail-img'
          src={songs?.previewImage}
          alt={songs.title}
        />
        <h3 className='song-detail-title'>{songs?.title}</h3>
        <p>{songs?.description}</p>
        <p>
          by: <strong>{Artist?.username}</strong>
        </p>
        {Album && (
          <p>
            Album title: <strong>{Album?.title}</strong>
          </p>
        )}
      </div>
      <div className='song-detail-btns'>
        {user && user.id === songs.userId && (
          <button className='save-btn' onClick={() => setShowEditModal(true)}>
            Edit
          </button>
        )}

        {showEditModal && (
          <Modal>
            <EditSong setShowEditModal={setShowEditModal} songId={songId} />
          </Modal>
        )}
        {user && user.id === songs.userId && (
          <button className='cancel-btn' onClick={() => setShowDelModal(true)}>
            Delete
          </button>
        )}

        {showDelModal && (
          <Modal>
            <DeleteSong setShowDelModal={setShowDelModal} parsedId={parsedId} />
          </Modal>
        )}
      </div>
      {/* <div className='music-player'>
          <p className='player-title'>{songs.title}</p>
          <div className='player-controls'>
            <button>
              <i className='fa-solid fa-backward player-icon'></i>
            </button>
            <button>
              <i className='fa-solid fa-play player-icon'></i>
            </button>
            <button>
              <i className='fa-solid fa-pause player-icon'></i>
            </button>
            <button>
              <i className='fa-solid fa-stop player-icon'></i>
            </button>
            <button>
              <i className='fa-solid fa-forward player-icon'></i>
            </button>
          </div>
      </div> */}
    </>
  );
}

export default SongDetails;
