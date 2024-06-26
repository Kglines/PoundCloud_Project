// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink, Redirect } from 'react-router-dom';
import './LoginForm.css'
import DemoUser from '../DemoUser';

function LoginForm({ setShowModal, showModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isVisible, setIsVisible] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        history.push('/library')
        setCredential('')
        setPassword('')
      })
      .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    ); 
  };
    
  

  return (
    <>
      <div className='login-form-container'>
        <form className='login-form' onSubmit={handleSubmit}>
          <h2>Log In</h2>
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
                type={isVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password && <i
                id="eye-icon"
                className={`fas fa-eye${isVisible ? '-slash' : ''}`}
                onClick={() => setIsVisible(!isVisible)}
              ></i>}
            </label>
          </div>
          <button
            id='login-btn-form'
            className='log-in-btn login-btn-form'
            type='submit'
          >
            LOG IN
          </button>
          <DemoUser />
        </form>
        <p className='signup-today-container'>
          Not a member yet?{' '}
          <button onClick={() => {
            history.push('/signup')
            setShowModal(false)
            }}>CLICK HERE</button> to
          sign up today!
        </p>
      </div>
    </>
  );
}

export default LoginForm;
