import React from 'react';
import { Button } from 'react-bootstrap';
import Navbar from '../components/navbar/Navbar';
import GigWrapper from './components/GigWrapper';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='mx-3 my-2'>
        <Button className='d-block ms-auto'>Create New</Button>
      </div>
      <GigWrapper />
    </div>
  );
};

export default Home;
