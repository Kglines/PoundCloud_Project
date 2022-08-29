import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SongDetails({ songs }) {
    const { songId } = useParams();
    const song = songs.find(song => song.id === songId);
    // const song = useSelector(state => state.songs[songId]);
    // console.log('song = ', song)
  return (
    <div className='song-card'>
      <h2>Song Details</h2>
    </div>
       
  );
}

export default SongDetails;
