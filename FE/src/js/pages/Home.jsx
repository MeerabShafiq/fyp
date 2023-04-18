import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Navbar from '../components/navbar/Navbar';
import GigWrapper from '../components/components/GigWrapper';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div>
      <Navbar {...props}/>
      <Row className='mx-3 my-2'>
        <Col md={10} className='text-center'> Gigs</Col>
        <Col md={2}><Link to='/gig-add'><Button className='d-block ms-auto rounded-3'> Create New</Button></Link></Col>
      </Row>
      <GigWrapper />
    </div>
  );
};

export default Home;
