import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { fetchAllSongs } from '../../../store/songs';
import CreateSong from '../../Songs/CreateSong';


function CurrentuserSongs() {
  const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const songs = Object.values(useSelector((state) => state.songs));
    const user = useSelector((state) => state.session.user);

    const songList = [];

    songs.forEach(async (song) => {
      if (song.userId === user.id) await songList.push(song);
    });

    useEffect(() => {
        dispatch(fetchAllSongs())
    }, [dispatch])

    if (!user) return <Redirect to='/login' />;
  return (
    <div>
      <h3 className='song-header'>My Songs: </h3>
      <button className='user-add-song-btn' onClick={() => setShowModal(true)}>
        +Add Song
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSong setShowModal={setShowModal} />
        </Modal>
      )}
      <div className='user-songs-container'>
        {songList ? (
          songList.map((song) => (
            <div key={song.id} className='song-card'>
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
          ))
        ) : (
          <h3>No Songs Created Yet...</h3>
        )}
      </div>
    </div>
  );
}

export default CurrentuserSongs
