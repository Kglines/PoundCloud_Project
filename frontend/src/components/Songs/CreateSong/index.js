import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './CreateSong.css'

function CreateSong() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [validationErros, setValidationErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

    }
  return (
    <form>
        <h2>Create a song</h2>
        <label>
            Title
            <input
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
                name='title'
                placeholder='Title' />
        </label>
        <label>
            Description
            <input
                type='text'
                value={description}
                onChange={e => setDescription(e.target.value)}
                name='description'
                placeholder='Description' />
        </label>
        <label>
            Song Url
            <input
                type='text'
                value={url}
                onChange={e => setUrl(e.target.value)}
                name='url'
                placeholder='Song url' />
        </label>
    </form>
  )
}

export default CreateSong
