import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Navbar from '../components/navbar/Navbar';
import GigWrapper from '../home/components/GigWrapper';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Row className='mx-3 my-2'>
        <Col md={10} className='text-center'> Gigs</Col>
        <Col md={2}><Button className='d-block ms-auto rounded-3'>Create New</Button></Col>
      </Row>
      <GigWrapper />
    </div>
  );
};

export default Home;
