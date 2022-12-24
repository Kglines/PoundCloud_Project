import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAlbums } from '../../store/albums';
import AlbumDetails from './AlbumDetails';
import './Albums.css';
import CreateAlbum from './CreateAlbum';

function Albums() {
  const dispatch = useDispatch();
  const [data, setData] = useState('')
  const [errors, setErrors] = useState([])
  const user = useSelector(state => state.session.user);
  // console.log(user)

  const albums = Object.values(useSelector(state => state.albums));
// console.log('albums = ', albums)
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchAlbums())
      setData(data)
    }
    fetchData()
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
      })
  }, [dispatch]);

  console.log('ALBUMS DATA = ', data.Albums)

  return (
    <>
      <h2 className='album-header-home'>SoundCloud Albums</h2>
      <div className='album-container'>
        {data?.Albums?.map((album) => (
          <div className='album-card' key={album?.id}>
            <NavLink
              className='album-link'
              key={album?.id}
              to={`/albums/${album?.id}`}
            >
              <div className='album-banner'>
                <img
                  className='album-img'
                  src={album?.previewImage}
                  alt={album?.title}
                />
                <h3 className='album-title-home'>{album?.title}</h3>
              </div>
            </NavLink>
            <p className='album-desc-home'>{album?.description}</p>
          </div>
        ))}
        
      </div>

    </>
  );
}

export default Albums;
