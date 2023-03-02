import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllSongs } from '../../store/songs';
import Card from '../Card';
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
    <div className='songs-page-container'>
      <ul>
        {validationErrors &&
          validationErrors?.map((error) => (
            <li className='errors' key={error}>
              {error}
            </li>
          ))}
      </ul>
      <h2 className='song-header'>PoundCloud Songs:</h2>
      <div className='song-container-home'>
        {data?.Songs?.map((song) => (
          <div>
            <Card id={song?.id} title={song?.title} description={song?.description} previewImage={song?.previewImage} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Songs;
