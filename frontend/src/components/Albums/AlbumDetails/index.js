import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './AlbumDetails.css';
import { fetchAlbum } from '../../../store/albums';

function AlbumDetails() {
    const { albumId } = useParams();
    // const dispatch = useDispatch();
    // const albums = Object.values(useSelector(state => state.albums))
    // const albums = useSelector(state => state.albums);
    // const album = albums.find(album => album.id === parseInt(albumId));

    // const album = albums.find(album => album.id === albumId);

    console.log('albumId = ', albumId)

    // useEffect(() => {
    //     dispatch(fetchAlbum(album))
    // }, [])

  return (
    <h2>Album Details</h2>
  )
}

export default AlbumDetails;
