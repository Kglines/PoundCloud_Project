import React from 'react'
import { NavLink } from 'react-router-dom';

function AlbumListItem({ album }) {
  return (
    <div className='album-card'>
      <NavLink className='album-link' key={album.id} to={`/albums/${album.id}`}>
        <div className='album-banner'>
          <img
            className='album-img'
            src={album.previewImage}
            alt={album.title}
          />
          <h3 className='album-title-home'>{album.title}</h3>
        </div>
      </NavLink>
      <p className='album-desc-home'>{album.description}</p>
    </div>
  );
}

export default AlbumListItem
