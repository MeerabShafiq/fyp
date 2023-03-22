import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Gigscard from './Gigscard';

const GigWrapper = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <div className='d-flex align-items-center px-5'>
              <img src='https://dummyimage.com/75x75/000/fff' alt='' className='rounded-circle'/>
              <h4 className='ps-4'>Ashir Ali Bhali</h4>
            </div>
            {/* <Link to='#'> Add bank details</Link> */}
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Gigscard />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GigWrapper;
