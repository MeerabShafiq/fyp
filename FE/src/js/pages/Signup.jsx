import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//styles
import styles from '../../scss/pages/login.module.scss';

const Signup = () => {
  const navigate = useNavigate();
  const [loginform, setLoginform] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confrimPassword: '',
  });

  const handleChange = (e) => {
    setLoginform((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   ( (loginform.firstName),
    (loginform.lastName),
    (loginform.email) ,(loginform.password || loginform.confrimPassword)&& navigate('/')
    );
    let fnameError = '';
    let lnameError = '';
    let emailError = '';
    let passwordError = '';
    let conformPasswordError = '';
    const {firstName,email}= this.state;
    
    if (!firstName){
      fnameError = "fname is required";
    } 
    if (!email){
      emailError = "email is required";
    }
    if (firstName || email) {
      this.setState({ fnameError,emailError: 'Please fix the errors below.' });
      return;
    }
     

  };
  return (
    <Container className={styles.container}>
      <Form className={styles.formContainer} onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className='mb-3'>
        <label>First name</label>
          <input
            type='text'
            className='form-control'
            placeholder='First name'
            name='firstName'
            
            onChange={handleChange}
          />
       
        </div>

        <div className='mb-3'>
          <label>Last name</label>
          <input type='text' className='form-control' placeholder='Last name' name='lastName' onChange={handleChange} />
        </div>

       
        <div className='mb-3'>
        
      
          <label>Email address</label>
          <input type='email' className='form-control' placeholder='Enter email' name='email' onChange={handleChange}/>
        </div>
      
        <div className='mb-3'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Enter password'
            name='password'
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label>confirm Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Confirm password'
            name='confirmPassword'
            onChange={handleChange}
          />
        </div>

        <div className='d-grid'>
          <button type='submit'  className='btn btn-primary'  >
            Sign Up
          </button>
        </div>

        <p className='forgot-password text-right'>
          Already registered <a href='/login'>sign in?</a>
        </p>
      
      </Form>
    </Container>
  );
};
export default Signup;
