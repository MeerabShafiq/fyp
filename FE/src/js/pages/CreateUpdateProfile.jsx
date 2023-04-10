import React, { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import styles from '../../scss/pages/createUpdateProfile.module.scss';
const CreateUpdateProfile = () => {
  const fileInputRef = useRef(null);
  return (
    <Container>
      <h2 className={styles.header}>Create Profile: </h2>
      <div className={styles.container}>
        <div className='d-flex mt-5 mb-5'>
        <Form.Group className='mb-3 '>
        <Form.File
        id="upload-image"
        label="Upload an image"
        onChange={handleImageChange}
        custom
      />
                <Button htmlFor='upload-image'><img src='https://dummyimage.com/80x80/000/fff' alt='' className='rounded-circle' /></Button>
              </Form.Group>
          <div className='ms-4'>
            <h3 className={styles.username}> Use Name</h3>
            <div className={styles.usermail}>useremail@use.com</div>
          </div>
        </div>
        <div>
          <h2>Educational Informaton: </h2>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Name of Instritute</Form.Label>
              <Form.Select aria-label='Default select example'>
                <option>Open this select menu</option>
                <option value='1'>One</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option>
              </Form.Select>
            </Form.Group>
            <div className='d-flex'>
              <Form.Group className='mb-3'>
                <Form.Label> </Form.Label>
                <Form.Control placeholder='Dgree Name' name='degree' />
              </Form.Group>
              <Form.Group className='mb-3 ps-5'>
                <Form.Label>Duration</Form.Label>
                <div className='mb-3 d-flex'>
                  <Form.Control type='date' placeholder='From' name='description' className='me-3' />
                  <Form.Control type='date' placeholder='to' name='description' />
                </div>
              </Form.Group>
            </div>
            <h2>Industurial Information</h2>
            <Form.Group className='mb-3'>
              <Form.Label>Name of Instury</Form.Label>
              <Form.Control placeholder='Description' name='description' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Duration</Form.Label>
              <div className='mb-3 d-flex'>
                <Form.Control type='date' placeholder='From' name='description' className='me-3' />
                <Form.Control type='date' placeholder='to' name='description' />
              </div>
            </Form.Group>
            <Form.Group className='d-block mb-4'>
              <Form.Label>Certification</Form.Label>
              <Form.Control className='d-none' id='input-id' name='file' ref={fileInputRef} type='file' />
              <div className='border'>
                <Button className={styles.bordered_button} htmlFor='input-id'>
                  +
                </Button>
              </div>
            </Form.Group>
            <Form.Group className='mb-3 d-flex'>
              <Form.Control as='textarea' placeholder='Description' style={{ height: '100px' }} name='description' />
            </Form.Group>
            <Button>Nex</Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default CreateUpdateProfile;
