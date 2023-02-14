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
  

  const albums = Object.values(useSelector(state => state.albums));

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

  return (
    <div className='album-page-container'>
      <h2 className='album-header'>PoundCloud Albums:</h2>
      <div className='album-container-home'>
        {data?.Albums?.map((album) => (
          <div className='album-card-home' key={album?.id}>
            <NavLink
              className='album-link-home'
              key={album?.id}
              to={`/albums/${album?.id}`}
            >
              <div className='album-banner'>
                <img
                  className='album-img-home'
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

    </div>
  );
}

export default Albums;
