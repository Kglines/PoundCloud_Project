// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import './LoginForm.css'
import DemoUser from '../DemoUser';

function LoginForm({ setShowModal, showModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  console.log(showModal)

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => history.push('/currentuser'))
      .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    ); 
  };
    
    

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h2>Log In: </h2>
      <ul>
        {errors.map((error) => (
          <li className='errors' key={error}>
            {error}
          </li>
        ))}
      </ul>
      <div className='login-form-inputs'>
        <label>
          Username or Email
          <input
            type='text'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
      </div>
      <button
        id='login-btn-form'
        className='log-in-btn nav-link login-btn-form'
        type='submit'
      >
        Log In
      </button>
      <DemoUser />
      <p>
        Not a member yet?{' '}
        <NavLink to='signup' onClick={() => setShowModal(false)}>
          Click Here
        </NavLink>{' '}
        to sign up today!
      </p>
    </form>
  );
}

export default LoginForm;
