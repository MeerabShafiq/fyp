import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Navbar from '../components/navbar/Navbar';
import GigWrapper from '../components/components/GigWrapper';
import style from '../../scss/pages/login.module.scss'
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div>
      <Navbar {...props}/>
      <div  className={style.h}>
      <Row className='mx-3 my-2'>
        <Col md={10} className='text-center'> Gigs</Col>
        <Col md={2}><Link to='/gig-add'><Button className='d-block ms-auto rounded-3'> Create New</Button></Link></Col>
      </Row>
      <GigWrapper {...props}/>
      </div>
    </div>
  );
};

export default Home;
