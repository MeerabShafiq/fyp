import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
//styles
import styles from '../../scss/pages/login.module.scss';

const Login = () => {
  const navigate = useNavigate();

  const [loginform, setLoginform] = useState({ email: '', password: '' });
  // const [errorMessage, setErrorMessage] = useState('');
  const [emailerror, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    setLoginform((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    let emailS ='';
    let passwordS ='';

    e.preventDefault();
   let isValid = true;
   if(loginform.email.trim()==='')
   {
    setEmailError('email is required')
    isValid = false;
    emailS=loginform.email;

  }
   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginform.email)) {
    setEmailError('Invalid email address')
  }
   else{
    setEmailError('')
   }
   if(loginform.password.trim()==='')
   {
    setPasswordError('password is required')
  isValid=false 
     passwordS=loginform.password;  
     console.log(passwordS)

}else{
    setEmailError('')
  }
  if(loginform.email==emailS && loginform.password==passwordS)
  {
    loginform.email && loginform.password && navigate('/home');
  }
   
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

        {emailerror &&<div>{emailerror}</div>}
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
           {passwordError &&<div>{passwordError}</div>}
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
