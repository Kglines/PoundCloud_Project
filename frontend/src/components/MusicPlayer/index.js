import React from 'react'
import ReactAudioPlayer from 'react-audio-player';
import './MusicPlayer.css';

const MusicPlayer = ({ song }) => {
  return (
    <div className='music-player-container'>
        <ReactAudioPlayer src={song} controls className='music-player' />
    </div>
  )
}

export default MusicPlayer
