import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

function CreatePlaylist({ user }) {
    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [previewImage, setPreviewImage] = useState('');


    const handleSubmite = (e) => {
        e.preventDefault();

        const payload = {
            name, previewImage, userId: user.id
        }
        
    }
  return (
    <div>CreatePlaylist</div>
  )
}

export default CreatePlaylist
