import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSong } from '../../../store/songs';
import './SongDetails.css';
import EditSong from '../EditSong';
import DeleteSong from '../DeleteSong';
import { Modal } from '../../../context/Modal';
import ReactAudioPlayer from 'react-audio-player';
import Comments from '../../Comments/Comments';
import CreateComment from '../../Comments/CreateComment';

function SongDetails() {
  const { songId } = useParams();
  const parsedId = parseInt(songId, 10);
  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [songs, setSongs] = useState('');
  const [errors, setErrors] = useState([]);
  const songState = useSelector(state => state.songs);
  const user = useSelector(state => state.session.user);
  // const comments = useSelector(state => state.comments)
  const { Artist, Album } = songs;
  
  useEffect(() => {
    const fetchData = async () => {
      const song = await dispatch(fetchSong(parsedId));
      setSongs(song)
    }
    fetchData()
      .catch(async (res) => {
        const data = await res.json()
        if(data && data.errors) setErrors(data.errors)
      })
    
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
          src={songState?.previewImage}
          alt={songState?.title}
        />
        <h3 className='song-detail-title'>{songState?.title}</h3>
        <p>{songState?.description}</p>
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
        {user && user?.id === songs?.userId && (
          <button className='save-btn' onClick={() => setShowEditModal(true)}>
            Edit
          </button>
        )}

        {showEditModal && (
          <Modal onClose={() => setShowEditModal(false)}>
            <EditSong setShowEditModal={setShowEditModal} songId={songId} />
          </Modal>
        )}
        {user && user?.id === songs?.userId && (
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
      <ReactAudioPlayer className='audio-player' src={songs?.url} controls />
      <CreateComment song={songs} />
      <Comments song={songs} />
    </>
  );
}

export default SongDetails;
