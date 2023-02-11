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
    <div className='song-detail-page-container'>
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
        <div className='song-detail-data'>
          <div className='song-detail-info'>
            <div className='song-details'>
              <div className='song-details-title-side'>
                <h3 className='song-detail'>{songState?.title}</h3>
                <p className='song-detail description'>
                  {songState?.description}
                </p>
              </div>
              <div className='song-details-album-side'>
                <p className='song-detail'>
                  by: <strong>{Artist?.username}</strong>
                </p>
                {Album && (
                  <p className='song-detail'>
                    Album title: 
                    {/* <strong>{Album?.title}</strong> */}
                    <strong>
                      <NavLink className='song-link-home' to={`/albums/${Album?.id}`}> {Album?.title}</NavLink>
                    </strong>
                  </p>
                )}
              </div>
            </div>

            <ReactAudioPlayer
              className='audio-player'
              src={songs?.url}
              controls
            />
          </div>
          <div className='song-detail-img-and-buttons'>
            <div className='song-detail-img-container'>
              <img
                className='song-detail-img'
                src={songState?.previewImage}
                alt={songState?.title}
              />
            </div>
            <div className='song-detail-btns'>
              {user && user?.id === songs?.userId && (
                <button
                  className='save-btn'
                  onClick={() => setShowEditModal(true)}
                >
                  Edit
                </button>
              )}

              {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                  <EditSong
                    setShowEditModal={setShowEditModal}
                    songId={songId}
                  />
                </Modal>
              )}
              {user && user?.id === songs?.userId && (
                <button
                  className='cancel-btn'
                  onClick={() => setShowDelModal(true)}
                >
                  Delete
                </button>
              )}

              {showDelModal && (
                <Modal>
                  <DeleteSong
                    setShowDelModal={setShowDelModal}
                    parsedId={parsedId}
                  />
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='song-details-comments-container'>
        {user && <CreateComment song={songs} />}
        <Comments song={songs} />
      </div>
    </div>
  );
}

export default SongDetails;
