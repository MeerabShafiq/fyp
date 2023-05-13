import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form } from 'react-bootstrap';
import styles from '../../scss/pages/addUpdate.module.scss';
import style from '../../scss/pages/login.module.scss'
import { fetchrequest } from '../../function';
import axios from 'axios';

const AddUpdategig = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const userId = JSON?.parse(localStorage?.getItem('user-token'))?.userId;
  const [gig, setGig] = useState({ title: '', price: 0, description: '' , image:''});
  const goBack = () => navigate(-1);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = ({ target }) => {
    setGig((p) => ({ ...p, [target.name]: target.value }));
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setGig((p) => ({ ...p, image: selectedFile }));
    console.log('Selected file:', selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', gig.image);
    formData.append('upload_preset', 'Gigs-image');
    const isSubmit = gig.title&&gig.description&& gig.price&& gig.image
    console.log(gig, );
    isSubmit&& 
    axios
      .post('https://api.cloudinary.com/v1_1/Gigs-image/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          upload_preset: 'Gigs-image',
          api_key: '892285218522175',
          api_secret: 'dEA5TjoVS2s62QV3XXSoH1gkArA',
        },
      })
      .then(async (res) => {
        await fetchrequest({
          method:'post', endpoint:'create-gig', data:{userId, title: gig.title, price: gig.price, description:gig.description, image:res.data['secure_url']}
        }).then((res) => {
          navigate('/') 
          console.log(res);
        });
        console.log(res.data['secure_url']);
      })
      .catch((err) => console.log(err));
 
  

    
  };
  return (
    <div  className={style.h}>
    <Container className='px-5'>
      <h2 className={clsx(styles.cardTitle, 'py-5')} style={{ fontWeight: 'bold' , color: '#000000' }} onClick={goBack}>
        <span   className='border'>{`<`}</span>Create New Gig
      </h2>
      <Card style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }} className={clsx(styles.card)}>
        <Card.Body>
          <Card.Title className={styles.gigInfo}>Gig Information:</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3 d-flex'>
              <Form.Control className='me-3' required type='text' placeholder='Title' name='title' onChange={handleChange} />
              <Form.Control required type='number' min={1} placeholder='Price' name='price' onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-3 d-flex'>
              <Form.Control
                as='textarea'
                placeholder='Description'
                style={{ height: '100px' }}
                required
                name='description'
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className='d-none'
                id='addfile'
                name='file'
                required
                ref={fileInputRef}
                type='file'
                onChange={handleFileChange}
              />
              <Button className={styles.bordered_button} onClick={handleButtonClick}>
                +
              </Button>
            </Form.Group>
            <Button type='submit' onClick={handleSubmit}>Create Gig</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
};

export default AddUpdategig;
