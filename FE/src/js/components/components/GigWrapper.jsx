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
  const text = ` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
  software like Aldus PageMaker including versions of Lorem Ipsum.`;

  useEffect(() => {
    setLoading(true)
    fetchrequest({
      endpoint:`get-profile/${userId}`
    }).then((res) => {
      setPrifile(res.data.results||[]);
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
              <h4 className='ps-4'>{profile.name}</h4>
            </div>
            {/* <Link className='my-3' onClick={() => setOpen(true)}>
              Add bank details
            </Link> */}
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
