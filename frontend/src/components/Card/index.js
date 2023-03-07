import React from 'react'
import { NavLink } from 'react-router-dom';

const Card = ({ title, description, previewImage, id, url}) => {
  console.log('URL === ', url)
  return (
    <div key={id} className='song-card-home'>
      <NavLink
        className='song-link-home'
        key={id}
        to={`/${url}/${id}`}
      >
        <div className='song-banner'>
          <img
            className='song-img-home'
            src={previewImage}
            alt={title}
          />
          <h3 className='song-title-home'>{title}</h3>
        </div>
      </NavLink>
      <p className='song-desc-home'>{description}</p>
    </div>
  );
}

export default Card
