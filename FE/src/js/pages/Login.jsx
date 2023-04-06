import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
//styles
import styles from '../../scss/pages/login.module.scss';

const Login = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [loginform, setLoginform] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setLoginform((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleSubmit = () => {
     
    if(email==="" || password==="")
     { 
       setErrorMessage('field is empty');
     }
     else {
      alert('login')
     }

    (loginform.email&& loginform.password)&& navigate('/');
  };
  return (
  
    <Container className={styles.container}>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
      
        <h3>Sign In</h3>
   
        <div className='mb-3' >
          <label>Email address</label>
          <input type='email' className='form-control' placeholder='Enter email' name='email' value={email} onChange={(event)=> setemail(event.target.email)} />
         
          <div style={{color:'red'}}>
          {errorMessage}
            </div>
        </div>

        <div className='mb-3'>
       
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Enter password'
            name='password'
            value={password}
            onChange={(event)=> setPassword(event.target.password)}
          
          />
           <div style={{color:'red'}}>
          {errorMessage}
            </div>
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
          <button type='submit' className='btn btn-primary'>
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
