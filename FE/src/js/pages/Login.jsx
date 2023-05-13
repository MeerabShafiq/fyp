import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
//styles
import styles from '../../scss/pages/login.module.scss';
import { fetchrequest } from '../../function';

const Login = () => {
  const navigate = useNavigate();

  const [loginform, setLoginform] = useState({ email: '', password: '' });
  // const [errorMessage, setErrorMessage] = useState('');
  const [emailerror, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    setLoginform((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (loginform.email.trim() === '') {
      setEmailError('email is required');
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginform.email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (loginform.password.trim() === '') {
      setPasswordError('password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (loginform.email && loginform.password && isValid) {
      try {
      await fetchrequest({ endpoint: 'login', method: 'post', data: { ...loginform } }).then((res) => {
        console.log(res);
        if (res?.data?.success) {
          localStorage.setItem(
            'user-token',
            JSON.stringify({
              userId: res.data.userId,
              token: res.data.token,
              email: res.data.email,
              name: res.data.name,

            })
          );
          navigate('/');
        }
      });
    } catch (error) {
      if(error.response?.data.message==='Authentication failed. Wrong password.'){
        setPasswordError('Password is incorect');
      }
      else if(error.response?.data.message==='Authentication failed. Email not found.'){
        setEmailError('Email is incorect');
      }
    }
  }
  };

  return (
    <div  className={styles.h}>
    <Container className={styles.container}>
      <form className={styles.formContainer}>
        <h3 style={{ fontWeight: 'bold' }}>Sign In</h3>

        <div className='mb-3'>
          <label style={{ fontWeight: 'bold' , color: '#000000' }}>Email address</label>
          <input
            type='email'
            className='form-control'
            placeholder='Enter email'
            name='email'
            value={loginform.email}
            onChange={handleChange}
          />

          {emailerror && <div style={{ color: 'red' }}>{emailerror}</div>}
        </div>

        <div className='mb-3'>
          <label style={{ fontWeight: 'bold' , color: '#000000' }}>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Enter password'
            name='password'
            value={loginform.password}
            onChange={handleChange}
          />
          {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        </div>

        <div className='mb-3'>
          <div className='custom-control custom-checkbox'>
            <input type='checkbox' className='custom-control-input' id='customCheck1' />
            <label className='custom-control-label' htmlFor='customCheck1' style={{ fontWeight: 'bold' , color: '#000000' }}>
              Remember me
            </label>
          </div>
        </div>

        <div className='d-grid'>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Submit
          </button>
        </div>
        
        <p className={'forgot-password text-right'} style={{ fontWeight: 'bold' , color: '#000000' }}>
          ALready User? <Link to='/signup'>Sign up </Link>
        </p>
      </form>
    </Container>
    </div>
  );
};

export default Login;
