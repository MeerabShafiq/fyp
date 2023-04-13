import React, { useState } from 'react';
import { Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReadMore from '../core/global/ReadMore';
import Gigscard from './Gigscard';

const GigWrapper = () => {
  const [open, setOpen]=useState(false)
  const text = ` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
  software like Aldus PageMaker including versions of Lorem Ipsum.`;

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card className='p-4 '>
            <div className='d-flex align-items-center px-3'>
              <img src='https://dummyimage.com/75x75/000/fff' alt='' className='rounded-circle' />
              <h4 className='ps-4'>Ashir Ali Bhali</h4>
            </div>
            <Link className='my-3' onClick={()=>setOpen(true)}>
              Add bank details
            </Link>
            <Card className='p-2'>
              <ReadMore text={text} maxLength={350} />
            </Card>
            <div className='py-3'>
              <h4>Educational Information:</h4>
              <p>
                University of management & technology UET
              </p>
            </div>
            <div>
            <Row>
              <Col md={4}><div>From</div><div>03/13/2021</div></Col>
              <Col md={4}><div>to</div><div>03/13/2023</div></Col>
            </Row>
            </div>
            <div>
            <div className='py-3'>
              <h4>Educational Information:</h4>
              <p>
                University of management & technology UET
              </p>
            </div>
            <Row>
            <Col md={4}><div>From</div><div>03/13/2021</div></Col>
              <Col md={4}><div>to</div><div>03/13/2023</div></Col>
            </Row>
            </div>
          </Card>
        </Col>
        <Col md={8}>
          <Card className='p-2'>
            <Gigscard />
          </Card>
        </Col>
      </Row>
      {open?<PaymentModal open={open} setOpen={setOpen}/>:null }
    </Container>
  );
};

const PaymentModal= ({open, setOpen})=>{
  console.log('test');
<Modal show={true} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
  <Modal.Header>bhhjjh</Modal.Header>
  <Modal.Body>jkjkjkkj</Modal.Body>
</Modal>
}
export default GigWrapper;
