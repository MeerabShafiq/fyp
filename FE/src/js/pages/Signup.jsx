import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//styles
import styles from '../../scss/pages/login.module.scss';

const Signup = () => {
  const navigate = useNavigate();
  let hasErrors = false;

  const [loginform, setLoginform] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confrimPassword: '',
  });
  const [errors, setErrors] = useState({
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
    if (!loginform.firstName.trim()) {
      setErrors((p) => ({ ...p, firstName: 'First Name is required' }));
      hasErrors = true;
    } else {
      setErrors((p) => ({ ...p, firstName: '' }));
    }
    if (!loginform.lastName.trim()) {
      setErrors((p) => ({ ...p, lastName: 'Last Name is required' }));
      hasErrors = true;
    } else {
      setErrors((p) => ({ ...p, lastName: '' }));
    }
    if (!loginform.email.trim()) {
      setErrors((p) => ({ ...p, email: 'Email is required' }));
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(loginform.email)) {
      setErrors((p) => ({ ...p, email: 'Email is invalid' }));
      hasErrors = true;
    } else {
      setErrors((p) => ({ ...p, email: '' }));
    }
    if (!loginform.password.trim()) {
      setErrors((p) => ({ ...p, password: 'Password is required' }));
      hasErrors = true;
    } else if (loginform.password.length < 8) {
      setErrors((p) => ({ ...p, password: 'Password must be at least 8 characters' }));
      hasErrors = true;
    } else {
      setErrors((p) => ({ ...p, password: '' }));
    }
    if (loginform.confrimPassword !== loginform.password || !loginform.confrimPassword) {
      setErrors((p) => ({ ...p, confrimPassword: 'Confirm Password does not match with Password' }));
      hasErrors = true;
    } else {
      setErrors((p) => ({ ...p, confrimPassword: '' }));
    }

    if (hasErrors) {
      console.log('Form not submitted');
    } else {
      // Submit form
      navigate('/login');
      console.log('Form submitted');
    }
  };
  // Set hasErrors based on whether there are any errors
  useEffect(() => {
    hasErrors = !!(errors.firstName || errors.lastName || errors.email || errors.password || errors.confrimPassword);
  }, [errors]);

  return (
    <Container className={styles.container}>
      <Form className={styles.formContainer} onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className='mb-3'>
          <label>First name</label>
          <input
            type='text'
            className='form-control mb-2'
            placeholder='First name'
            name='firstName'
            onChange={handleChange}
          />
          {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
        </div>

        <div className='mb-3'>
          <label>Last name</label>
          <input
            type='text'
            className='form-control mb-2'
            placeholder='Last name'
            name='lastName'
            onChange={handleChange}
          />
          {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
        </div>

        <div className='mb-3'>
          <label>Email address</label>
          <input
            type='email'
            className='form-control mb-2'
            placeholder='Enter email'
            name='email'
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className='mb-3'>
          <label>Password</label>
          <input
            type='password'
            className='form-control mb-2'
            placeholder='Enter password'
            name='password'
            onChange={handleChange}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        <div className='mb-3'>
          <label>confirm Password</label>
          <input
            type='password'
            className='form-control mb-2'
            placeholder='Confirm password'
            name='confrimPassword'
            onChange={handleChange}
          />
          {errors.confrimPassword && <span className={styles.error}>{errors.confrimPassword}</span>}
        </div>

        <div className='d-grid'>
          <button type='submit' className='btn btn-primary'>
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
