import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './AlbumDetails.css';
import { fetchAlbum } from '../../../store/albums';
import CreateAlbum from '../CreateAlbum';
import EditAlbums from '../EditAlbums';
import DeleteAlbum from '../DeleteAlbum';

function AlbumDetails() {
    const { albumId } = useParams();
    const dispatch = useDispatch();
    const album = useSelector(state => state.albums)
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const { Artist, Songs } = album;

    useEffect(() => {
        dispatch(fetchAlbum(albumId))
    }, [dispatch]);

  return (
    <>
      <img src={album.previewImage} alt={album.title} />
      <h2>{album.title}</h2>
      <p>{album.description}</p>
      <p>Artist: {Artist && Artist.username}</p>
      <h3>Songs</h3>
      <ol>{Songs && Songs.map((song) => <li>{song.title}</li>)}</ol>
      <button onClick={() => setShowForm(true)}>Edit</button>
      <button onClick={() => setShowDelete(true)}>Delete</button>
      {showForm && <EditAlbums setShowForm={setShowForm} />}
      {showDelete &&  <DeleteAlbum setShowDelete={setShowDelete} albumId={albumId} />}
    </>
  );
}

export default AlbumDetails;
