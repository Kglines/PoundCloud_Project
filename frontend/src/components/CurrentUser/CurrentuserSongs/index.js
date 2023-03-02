import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { fetchAllSongs } from '../../../store/songs';
import Card from '../../Card';
import CreateSong from '../../Songs/CreateSong';
import './CurrentuserSongs.css';


function CurrentuserSongs() {
  const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const songs = Object.values(useSelector((state) => state.songs));
    const user = useSelector((state) => state.session.user);
    

    const songList = [];

    songs.forEach(async (song) => {
      if (song?.userId === user?.id) await songList.push(song);
    });

    useEffect(() => {
        dispatch(fetchAllSongs())
    }, [dispatch])


    if (!user) return <Redirect to='/login' />;

  return (
    <div className='current-user-songs-page'>
      <div className='user-song-header'>
        <h3>My Songs: </h3>
        <button className='user-add-song-btn' onClick={() => setShowModal(true)}>
          +Add Song
        </button>
        {showModal && (
          <Modal className='create-song-modal' onClose={() => setShowModal(false)}>
            <CreateSong setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
      <div className='user-songs-container'>
        {songList.length > 0 ? (
          songList.map((song) => (
            <div key={song.id} className='song-card-home'>
              <Card id={song.id} title={song.title} description={song.description} previewImage={song.previewImage} url='songs' />
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
