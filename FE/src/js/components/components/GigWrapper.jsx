import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Modal, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReadMore from '../core/global/ReadMore';
import Gigscard from './Gigscard';
import Payment from './Payment';
import { fetchrequest } from '../../../function';

const GigWrapper = (props) => {
  const [loading, setLoading]=useState(false)
  const [profile, setPrifile]=useState([])
  const userId = JSON?.parse(localStorage?.getItem('user-token'))?.userId;
  const name = JSON?.parse(localStorage?.getItem('user-token'))?.name;

  useEffect(() => {
    setLoading(true)
    fetchrequest({
      endpoint:`get-profile/${userId}`
    }).then((res) => {
      console.log(res);
      setPrifile(res.data.result||[]);
      setLoading(false)
    })
  }, [])
  
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card className='p-4 '>
            <div className='d-flex align-items-center px-3'>
              <img src='https://dummyimage.com/75x75/000/fff' alt='' className='rounded-circle' />
              <h4 className='ps-4'>{name}</h4>
            </div>
            {/* <Link className='my-3' onClick={() => setOpen(true)}>
              Add bank details
            </Link> */}
            <p  style={{fontWeight:'bold',marginTop:'12px',marginLeft:'2px'}}>Description</p>
            <Card className='p-2'>
            
              <ReadMore text={profile.description} maxLength={350} />
            </Card>
            <div className='py-3'>
              <h4>Educational Information:</h4>
              <p>{profile.industryName}</p>
            </div>
            <div>
              <Row>
                <Col md={4}>
                  <div>From</div>
                  <div>{profile.dateFromInd}</div>
                </Col>
                <Col md={4}>
                  <div>to</div>
                  <div>{profile.dateToInd}</div>
                </Col>
              </Row>
            </div>
            <div>
              <div className='py-3'>
                <h4>Educational Information:</h4>
                <p>{profile.instituteName}</p>
              </div>
              <Row>
                <Col md={4}>
                  <div>From</div>
                  <div>{profile.dateFromEd}</div>
                </Col>
                <Col md={4}>
                  <div>to</div>
                  <div>{profile.dateToEd}</div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col md={8}>
          <Card className='p-2'>
            <Gigscard {...props}/>
          </Card>
        </Col>
      </Row>
      {/* {open ? <PaymentModal open={open} setOpen={setOpen} /> : null} */}
    </Container>
  );
};

const PaymentModal = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const onSuccess = (result)=>{
console.log(result);
    handleClose()
  }
  console.log('test');
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add bank details</Modal.Title>
      </Modal.Header>
      <Modal.Body><Payment onSuccess={onSuccess}/></Modal.Body>
    </Modal>
  );
};
export default GigWrapper;
