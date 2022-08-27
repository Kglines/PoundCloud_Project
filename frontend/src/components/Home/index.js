import React from 'react';
import Albums from '../Albums';
import SearchBar from '../SearchBar';
import Songs from '../Songs';
import './Home.css';


function Home() {
  
  return (
    <div>
      <h1 className='banner'>Welcome to SoundCloud</h1>
      <img
        src='https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2874&q=80'
        alt='Credit: Aditya Chinchure'
        className='main-img'
      />
      <SearchBar />
      <Songs />
      <Albums />
    </div>
  );
}

export default Home
