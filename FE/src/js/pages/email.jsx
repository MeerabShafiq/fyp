import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form, Col, Row } from 'react-bootstrap';
import styles from '../../scss/pages/addUpdate.module.scss';
import style from '../../scss/pages/login.module.scss'
import { fetchrequest } from '../../function';
import {ToastContainer,toast} from 'react-toastify'

const sendMail = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
 
  const userId = JSON?.parse(localStorage?.getItem('user-token'))?.userId;
  const [field, setfield] = useState({ text: '', to: '' , subject:''});
  const goBack = () => navigate(-1);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = ({ target }) => {
    setfield((p) => ({ ...p, [target.name]: target.value }));
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setGig((p) => ({ ...p, image: selectedFile }));
    console.log('Selected file:', selectedFile);
  };

 
const data ={
  text:field.text,
  subject:field.subject,
    to:field.to, 
    
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(field.message, field.subject, field.to ,field.Time)
    try{
      await fetchrequest({
      method:'post', endpoint:'email', data:{...field}}).then((res) => {
      console.log(res);
      if(res?.data?.success)
      {
        JSON.stringify({
          text:res.data.text,
          subject: res.data.subject,
          to : res.data.to,
        })
        
      }
      toast.success('Offer submitted Successfully',
        {position: toast.POSITION.TOP_CENTER,
           autoClose:3000,

          })
          setTimeout(()=>{
            window.location.href = "https://buy.stripe.com/cN2g0jbIS8nXbEQ5ko";
          },4000)
        
    });
    
  
  
  
  }catch(error){
    return error;
  }
    
      
  };
  return (
    <div  className={style.h}>
     
    <Container className='px-5'>
      <h2  style={{ fontWeight: 'bold' , color: '#000000' }} className={clsx(styles.cardTitle, 'py-5')} onClick={goBack}>
        <span className='border'>{`<`}</span>PLace an order
      </h2>
      <Card style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }} className={clsx(styles.card)}>
        <Card.Body>
        
          <Card.Title className={styles.gigInfo}>communicate with seller:</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-2 d-flex'>
            </Form.Group>
            <Form.Group className='mb-3 d-flex'> 
              <Form.Control
                as='textarea'
                placeholder='text'
                style={{ height: '100px', width:'480px' }}
                required
                name='text'
                onChange={handleChange}
              />
             
            </Form.Group>
           
            <Row>
            <Col sm={4}>
            <Form.Group>
              <Form.Control
                 as='textarea'
                 placeholder='subject'
                 style={{ height: '50px' , width:'190px' }}
                 required
                 name='subject'
                 onChange={handleChange}
              />
            </Form.Group>
            </Col>
            <Col sm={4}>
            <Form.Group>
              <Form.Control
                 as='textarea'
                 placeholder='email'
                 style={{ height: '50px' , width:'190px' }}
                 required
                 name='to'
                 onChange={handleChange}
              />
            </Form.Group>
            </Col>
         <Col sm={4}>
            
            </Col>
            </Row>
            <div className="d-flex justify-content-end">
            <Button type='submit' onClick={handleSubmit}>Create offer</Button>
            <ToastContainer />
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
 
    </div>
  );
};

export default sendMail;
