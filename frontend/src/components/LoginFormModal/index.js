// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink } from 'react-router-dom';
import LoginForm from './LoginForm';
import './LoginForm.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <NavLink
        // id='log-in-btn'
        className='nav-link'
        onClick={() => setShowModal(true)}
        to={''}
      >
        Log In
      </NavLink>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} showModal={showModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
