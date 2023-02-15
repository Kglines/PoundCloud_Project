import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function DemoUser() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [credential, setCredential] = useState('Demo-lition');
    const [password, setPassword] = useState('password');
    const [validationErrors, setValidationErrors] = useState([]);

    const demoLogin = () => {
        dispatch(
          sessionActions.login({
            credential,
            password
          })
        )
          .then(() => {
            history.push('/currentuser');
            setCredential('');
            setPassword('');
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
          });
    };

  return (
    <button className='demo-btn' onClick={demoLogin}>
      DEMO USER
    </button>
  );
}

export default DemoUser
