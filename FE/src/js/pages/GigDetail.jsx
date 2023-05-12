import {React} from 'react';
import {useNavigate} from 'react-router-dom';
import { Card, Container, Form , Modal,Button} from 'react-bootstrap';
import styles from '../../scss/pages/gigdetail.module.scss'
import style from '../../scss/pages/login.module.scss'
import clsx from 'clsx';
import Payment from '../components/components/Payment';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import gigImage from '../../assets/best-fiverr-gigs.png' 

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
    <div  className={style.h}>
    <Container className='px-5'>
      <h2 style={{ fontWeight: 'bold' , color: '#000000'}} className={clsx(styles.cardTitle,'py-5')} onClick={goBack}> <span className='border'>{`<`}</span> Gig details</h2>
      <Card style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }} className= {clsx(styles.card)}>
      <Card.Body>
        <Card.Title className={styles.gigInfo}>Gig Information:</Card.Title>
        {/* <Link className='my-3'   onClick={()=>setOpen(true)}>
        
          <div style={{paddingLeft:"1000px"}}>
            Buy Now
          </div>
          
         
        </Link> */}
      <p style={{paddingLeft:"1000px"}}>
        <Link to="/email">Create offer</Link>
      </p>
        <div>
          <h3 className={styles.cardTitle}>Title of the GIG here</h3>
          <Card.Text className={styles.cardText}>
          {text}
        </Card.Text>
          <div className={styles.prices}>
          <h3 className={styles.cardTitle}>GIG Price</h3>
          </div>
          <img src={gigImage} alt='' className='rounded-4' />
        </div>
        
        </Card.Body>
      </Card>
      {open ? <PaymentModal open={open} setOpen={setOpen} /> : null}
      <ToastContainer/>
    </Container>
</div>
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
