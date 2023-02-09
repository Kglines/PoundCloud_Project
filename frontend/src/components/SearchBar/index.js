import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SearchBar.css';

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [songs, setSongs] = useState([]);
    console.log('SONGS = ', filteredData);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/songs')
            const data = await res.json();
            setSongs(data)
        }
        fetchData()
    }, [])

    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);

      const newFilter = songs?.Songs?.filter((song) => {
        return song?.title?.toLowerCase().includes(searchInput.toLowerCase());
      });

      if (searchInput === '') {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };

    const clearInput = () => {
      setFilteredData([]);
      setSearchInput('');
    };

  return (
    <div className='search'>
      <div className='search-inputs'>
        <input
          type='text'
          placeholder='Search Song Titles...'
          value={searchInput}
          onChange={handleChange}
        />
        <div className='search-icon'>
          {filteredData?.length === 0 ? (
            <i className='fa-solid fa-magnifying-glass'></i>
          ) : (
            <i
              className='fa-sharp fa-solid fa-xmark'
              id='clearBtn'
              onClick={clearInput}
            ></i>
          )}
        </div>
      </div>
      {filteredData?.length !== 0 && (
        <div className='data-result'>
          {filteredData?.map((data) => (
            <NavLink
              key={data?.id}
              className='data-link'
              to={`/songs/${data?.id}`}
            >
              <p className='data-item' onClick={clearInput}>
                {data?.title}
              </p>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar
