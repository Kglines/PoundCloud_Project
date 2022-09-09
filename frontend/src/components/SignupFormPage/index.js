// frontend/src/components/SignupFormPage/index.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
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
  
  if (sessionUser) return <Redirect to='/currentuser' />;

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
        if (data && data.errors) setErrors(data.errors);
      });

      
    }
    return setErrors([
      'Confirm Password field must be the same as the Password field',
    ]);
  };

  // console.log('sign up form page errors = ', errors)

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
    <ul>
      {errors.map(error => (
        <li className='errors' key={error}>{error}</li>
      ))}
    </ul>
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
      <button className='signup-btn' type='submit'>Sign Up</button>
      <p>Already a member? <NavLink to='/login'>Click Here</NavLink></p>
    </form>
  );
}

export default SignupFormPage;
