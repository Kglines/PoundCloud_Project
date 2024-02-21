import React from 'react'
import { NavLink } from 'react-router-dom';
import './SmallCard.css';

function SmallCard({ title, description, previewImage, id, url }) {
  return (
    <section className='small-card-container'>
      <NavLink className='small-card-link' key={id} to={`/${url}/${id}`}>
        <div className='small-card-banner'>
          <img src={previewImage} alt={title} className='small-card-image' />
          <h3 className='small-card-title'>{title}</h3>
        </div>
      </NavLink>
      <p className='small-card-description'>{description}</p>
    </section>
  );
}

export default SmallCard
