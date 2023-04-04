import React, { useRef } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form } from 'react-bootstrap';
import styles from '../addUpdateGig/addUpdate.module.css';

const AddUpdategig = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const goBack = () => navigate(-1);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
  };
  return (
    <Container className='px-5'>
      <h2 className={clsx(styles.cardTitle, 'py-5')} onClick={goBack}>
        <span className='border'>{`<`}</span>Create New Gig
      </h2>
      <Card style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }} className={clsx(styles.card)}>
        <Card.Body>
          <Card.Title className={styles.gigInfo}>Gig Information:</Card.Title>
          <Form>
            <Form.Group className='mb-3 d-flex'>
              <Form.Control type='text' placeholder='Title' name='title' />
              <Form.Control type='number' placeholder='Price' name='price' />
            </Form.Group>
            <Form.Group className='mb-3 d-flex'>
              <Form.Control as='textarea' placeholder='Description' style={{ height: '100px' }} name='description' />
            </Form.Group>
            <Form.Group >
              <Form.Control className='d-none' id='addfile' name='file' ref={fileInputRef} type='file' onChange={handleFileChange} />
            <Button className={styles.bordered_button} for='input-id'>
              +
            </Button>
            </Form.Group>

            <Button>
              Create Gig
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddUpdategig;
