import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './AlbumDetails.css';
import { fetchAlbum, fetchAlbums } from '../../../store/albums';
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
    const [albums, setAlbums] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    
    const { Artist, Songs } = album;
    
    useEffect(() => {
      dispatch(fetchAlbum(albumId))
    }, [dispatch, albumId]);

    useEffect(() => {
      const fetchData = async () => {
        const data = await fetch('/api/albums')
        const albums = await data.json()
        setAlbums(albums)
      }
      fetchData()
    }, []);

    let userAlbums = []

    albums?.Albums?.forEach((album) => {
      if(album?.id !== parseInt(albumId, 10)){
        if(album?.userId === Artist?.id){
          userAlbums?.push(album)
        } 
      } 
    })

    
  return (
    <div className='album-page-container'>
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
            
          </div>
          <div className='songs-side'>
            <h3 className='album-detail-title'>{album.title}</h3>
            <p className='album-desc-home'>{album.description}</p>
            <h4 className='album-detail-artist'>Artist: {Artist?.username}</h4>
            <h4 className='album-songs-header'>Songs: </h4>
            <ol className='album-detail-song-list'>
              {Songs?.length > 0 ?
                Songs?.map((song) => (
                  <li key={song?.id} className='album-detail-song-container'>
                    <div className='album-detail-song-item'>
                      <NavLink to={`/songs/${song?.id}`}>{song?.title}</NavLink>
                    </div>
                    <div>
                      <ReactAudioPlayer
                        className='album-audio-player'
                        src={song?.url}
                        controls
                      />
                    </div>
                  </li>
                )) : (
                  <p>No songs added to this album yet.</p>
                )}
            </ol>
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
            <Modal onClose={() => setShowEditModal(false)}>
              <EditAlbums
                setShowEditModal={setShowEditModal}
                albumId={albumId}
              />
            </Modal>
          )}
          {showDeleteModal && (
            <Modal onClose={() => setShowDeleteModal(false)}>
              <DeleteAlbum
                setShowDeleteModal={setShowDeleteModal}
                albumId={albumId}
              />
            </Modal>
          )}
        </div>
      </div>
      <div className='album-alternatives'>
        <h3>Other albums from this artist:</h3>
        <div className='album-container-home'>
        {userAlbums.length > 0 ? (userAlbums?.map((album) => (
          <div className='song-card-home' key={album?.id}>
            <NavLink className='album-link-home' to={`/albums/${album?.id}`}>
              <img
                className='song-img-home'
                src={album?.previewImage}
                alt={album?.title}
              />
              <h4>{album?.title}</h4>
            </NavLink>
            <p className='song-desc-home'>{album.description}</p>
          </div>
        ))) : (
          <p>No other albums from this artist...yet!</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default AlbumDetails;
