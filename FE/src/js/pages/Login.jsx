import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
//styles
import styles from '../../scss/pages/login.module.scss';

const Login = () => {
  const navigate = useNavigate();

  const [loginform, setLoginform] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setLoginform((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginform.email === '' || loginform.password === '') {
      setErrorMessage('field is empty');
    } else {
      alert('login');
    }

    loginform.email && loginform.password && navigate('/home');
  };
  return (
    <Container className={styles.container}>
      <form className={styles.formContainer}>
        <h3>Sign In</h3>

        <div className='mb-3'>
          <label>Email address</label>
          <input
            type='email'
            className='form-control'
            placeholder='Enter email'
            name='email'
            value={loginform.email}
            onChange={handleChange}
          />

          <div style={{ color: 'red' }}>{errorMessage}</div>
        </div>

        <div className='mb-3'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Enter password'
            name='password'
            value={loginform.password}
            onChange={handleChange}
          />
          <div style={{ color: 'red' }}>{errorMessage}</div>
        </div>

        <div className='mb-3'>
          <div className='custom-control custom-checkbox'>
            <input type='checkbox' className='custom-control-input' id='customCheck1' />
            <label className='custom-control-label' htmlFor='customCheck1'>
              Remember me
            </label>
          </div>
        </div>

        <div className='d-grid'>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <p className='forgot-password text-right'>
          Forgot password <Link to='#'> password Reset</Link>
        </p>
        <p className={styles.signup}>
          New User? <a href='/signup'>Sign up </a>
        </p>
      </form>
    </Container>
  );
};

export default Login;
