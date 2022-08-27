import './SearchBar.css';
import React from 'react'

function SearchBar() {
  return (
    <div className='search-container'>
      <input
        className='search-input'
        placeholder='Search for artists, songs, or albums'
      >
      </input>
      <i className='fa-solid fa-magnifying-glass search-btn'></i>
        
    </div>
  );
}

export default SearchBar
