// frontend/src/components/SignupFormPage/index.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import {Modal} from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import './SignupForm.css';

function SignupFormPage() {

 
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  if (sessionUser) return <Redirect to='/library' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      
      return dispatch(
        sessionActions.signup({ email, username, firstName, lastName, password })
      )
        // .then(() => <Redirect to='/currentuser' />)
        .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors(data.message);
      });

      
    }
    return setErrors([
      'Confirm Password field must be the same as the Password field',
    ]);
  };

  return (
    <div className='signup-form-container'>
      <ul>
        {errors.map((error) => (
          <li className='errors' key={error}>
            {error}
          </li>
        ))}
      </ul>
      <form className='signup-form' onSubmit={handleSubmit}>
        <h2>Sign Up for PoundCloud: </h2>
        <label>
          Email
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className='signup-btn' type='submit'>
          Sign Up
        </button>
      </form>
      <p className='login-btn-container'>
        Already a member?
        <button
          onClick={() => setShowLoginModal(true)}
        >
          CLICK HERE
        </button>
      </p>
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}

export default SignupFormPage;
