import {React} from 'react';
import {useNavigate} from 'react-router-dom';
import { Card, Container, Form , Modal,Button} from 'react-bootstrap';
import styles from '../../scss/pages/gigdetail.module.scss'
import clsx from 'clsx';
import Payment from '../components/components/Payment';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios'

const GigDetail = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [doIt, setdoIt] = useState(false);
  const text = ` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
    into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
    software like Aldus PageMaker including versions of Lorem Ipsum.`;
const goBack = ()=>navigate(-1)
  return (
    <Container className='px-5'>
      <h2 className={clsx(styles.cardTitle,'py-5')} onClick={goBack}> <span className='border'>{`<`}</span> Gig details</h2>
      <Card style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }} className= {clsx(styles.card)}>
      <Card.Body>
        <Card.Title className={styles.gigInfo}>Gig Information:</Card.Title>
        {/* <Link className='my-3'   onClick={()=>setOpen(true)}>
        
          <div style={{paddingLeft:"1000px"}}>
            Buy Now
          </div>
          
         
        </Link> */}
      <p style={{paddingLeft:"1000px"}}>
        <Link to="https://buy.stripe.com/4gw9BV7sCaw5cIU7sv">BUY</Link>
      </p>
        <div>
          <h3 className={styles.cardTitle}>Title of the gig here</h3>
          <Card.Text className={styles.cardText}>
          {text}
        </Card.Text>
          <div className={styles.prices}>
            <div>hours 20</div>
            <div>rp 2000</div>
          </div>
          <img src='https://dummyimage.com/300x300/000/fff' alt='' />
        </div>
        </Card.Body>
       
      </Card>
      {open ? <PaymentModal open={open} setOpen={setOpen} /> : null}
      <ToastContainer/>
    </Container>
  );
};

const PaymentModal =({open , setOpen})=>{
  const handleClose = () => setOpen(false);
  console.log('test');
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add bank details</Modal.Title>
      </Modal.Header>
      <Modal.Body><Payment handleClose={handleClose} toast={toast}/></Modal.Body>
    </Modal>
  );
}

export default GigDetail;
