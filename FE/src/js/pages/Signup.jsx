import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//styles
import styles from '../../scss/pages/login.module.scss';
import style from '../../scss/pages/signin.module.scss';
//function
import { fetchrequest } from '../../function';

const Signup = () => {
  const navigate = useNavigate();
  let hasErrors = false;

  const [loginform, setLoginform] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setLoginform((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  //signup button fucntion
  const loginf = () => {
    navigate('/login');
  };
  //facebook button

 

  const handleSubmit = async (e) => {
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
    if (loginform.confirmPassword !== loginform.password || !loginform.confirmPassword) {
      setErrors((p) => ({ ...p, confirmPassword: 'Confirm Password does not match with Password' }));
      hasErrors = true;
    } else {
      setErrors((p) => ({ ...p, confirmPassword: '' }));
    }

    if (hasErrors) {
      console.log('Form not submitted');
    } else {
      // Submit form
      const data = {
        firstName: loginform.firstName,
        lastName: loginform.lastName,
        email: loginform.email,
        password: loginform.password,
        confirmPassword: loginform.confirmPassword,
      };

      fetchrequest({method:'post', endpoint: 'signup', data }).then((response) => {
        

        if ((response.status = 200)) {
          navigate('/login');
        } else {
          console.log('not signup');
        }
      });
    }
  };
  // Set hasErrors based on whether there are any errors
  useEffect(() => {
    hasErrors = !!(errors.firstName || errors.lastName || errors.email || errors.password || errors.confirmPassword);
  }, [errors]);

  return (
    <Container className={styles.container}>
      <Form className={styles.formContainer} onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className='mb-3'>
          <label>First name</label>
          <input
            type='text'
            value={loginform.firstName}
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
            value={loginform.lastName}
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
            value={loginform.email}
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
            value={loginform.password}
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
            value={loginform.confirmPassword}
            className='form-control mb-2'
            placeholder='Confirm password'
            name='confirmPassword'
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>

        <div className='d-grid'>
          <button type='submit' className='btn btn-primary'>
            Sign Up
          </button>
        </div>

        <div className='d-grid'>
          <a>Already registered?</a>
          <button type='submit' className={style.signupb} onClick={loginf}>
            Click here
          </button>
        </div>
      </Form>
    </Container>
  );
};
export default Signup;
