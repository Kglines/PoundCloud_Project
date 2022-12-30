import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import './Songs.css';

function Songs() {
  const [validationErrors, setValidationErrors] = useState([])
  const dispatch = useDispatch();
  const songs = Object.values(useSelector((state) => state.songs));
  const [data, setData] = useState('')
  // const songs = useSelector(state => state.songs)

  // useEffect(() => {
  //   dispatch(fetchAllSongs())
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setValidationErrors(data.errors);
  //     });
  // }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchAllSongs())
      setData(data)
    }
    fetchData()
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
  }, [dispatch])
  
  return (
    <div>
      <ul>
        {validationErrors &&
          validationErrors?.map((error) => (
            <li className='errors' key={error}>
              {error}
            </li>
          ))}
      </ul>
      <h2 className='song-header'>SoundCloud Songs</h2>
      <div className='song-container'>
        {data?.Songs?.map((song) => (
          <div key={song?.id} className='song-card'>
            <NavLink
              className='song-link'
              key={song?.id}
              to={`/songs/${song?.id}`}
            >
              <div className='song-banner'>
                <img
                  className='song-img'
                  src={song?.previewImage}
                  alt={song?.title}
                />
                <h3 className='song-title'>{song?.title}</h3>
              </div>
            </NavLink>
            <p className='song-desc'>{song?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Songs;
