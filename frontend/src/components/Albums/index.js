import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums } from '../../store/albums';
import Card from '../Card';
import './Albums.css';

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
            <Card id={album.id} title={album.title} description={album.description} previewImage={album.previewImage} url='albums' />
          </div>
        ))}
        
      </div>

    </div>
  );
}

export default Albums;
