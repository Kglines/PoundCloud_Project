import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './AlbumDetails.css';
import { fetchAlbum } from '../../../store/albums';
import EditAlbums from '../EditAlbums';
import DeleteAlbum from '../DeleteAlbum';

function AlbumDetails() {
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  // const [showCreateSongForm, setShowCreateSongForm] = useState(false);
  
    const { albumId } = useParams();
    const dispatch = useDispatch();
    const album = useSelector(state => state.albums)
    const sessionUser = useSelector(state => state.session.user);
    const { Artist, Songs } = album;

    console.log('albumDetails song = ', album)
    
    useEffect(() => {
      dispatch(fetchAlbum(albumId))
    }, [dispatch, albumId]);
    
  return (
    <>
      <div className='album-detail-container'>
        <div className='album-detail-card'>
          <div className='album-side'>
            <img
              className='album-detail-img'
              src={album.previewImage}
              alt={album.title}
            />
            <h2>{album.title}</h2>
            <p>{album.description}</p>
          </div>
          <div className='songs-side'>
            <p>Artist: {Artist && Artist.username}</p>
            <h3>Songs</h3>
            <ol>{Songs && Songs.map((song) => 
              <li>
              <NavLink to={`/songs/${song.id}`}>
                {song.title}
              </NavLink>
              </li>
              )}
            </ol>
          </div>
        </div>
        <div className='album-detail-btns'>
          {sessionUser && (
            <button
              className='album-detail-edit'
              disabled={sessionUser.id !== album.userId}
              onClick={() => setShowForm(true)}
            >
              Edit
            </button>
          )}
          {sessionUser && (
            <button
              className='album-detail-delete'
              disabled={sessionUser.id !== album.userId}
              onClick={() => setShowDelete(true)}
            >
              Delete
            </button>
          )}

          {showForm && (
            <EditAlbums setShowForm={setShowForm} albumId={albumId} />
          )}
          {showDelete && (
            <DeleteAlbum setShowDelete={setShowDelete} albumId={albumId} />
          )}
        </div>
      </div>
    </>
  );
}

export default AlbumDetails;
