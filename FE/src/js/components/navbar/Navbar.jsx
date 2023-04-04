import clsx from 'clsx';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import message from '../../../assets/envelop.svg';
import styles from '../../../scss/components/navbar/navbar.module.scss';
import RoundImage from '../core/profile/RoundImage';
import Image from '../svgbtn/SvgButton';

const CNavbar = () => {
  return (
    <Navbar expand='lg' className={styles.nav_container}>
      <Container fluid>
        <Navbar.Brand href='#'>
          <RoundImage />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Form className={clsx(styles.nav_search, 'd-flex')}>
            <Form.Control
              type='search'
              placeholder='Search'
              className={clsx(styles.pnav_color, 'ms-2 border-none')}
              icon='search'
              aria-label='Search'
            />
            <Button variant='white' className={clsx(styles.pnav_color)}>
              Search
            </Button>
          </Form>
          <Nav className='ms-auto my-2 my-lg-0 align-items-center' style={{ maxHeight: '120px' }} navbarScroll>
            <Nav.Link href='#action1' className='mx-3'>
              <Image use='notification' width='30' height='30' fill='#fff' />
            </Nav.Link>
            <Nav.Link href='#action2' className='mx-3'>
              <div>
              <img className='' src={message} width='30' height='38' />
              <div className={styles.messageonline} />
              </div>
            </Nav.Link>
            <Nav.Link href='#' className={clsx(styles.pnav_color, 'mx-3')}>
              Switch to Buyer
              <div className={styles.profileOnline} />
            </Nav.Link>
            <Nav.Link href='#' className={clsx(styles.pnav_color, 'mx-3')}>
              <div className='position-relative'>
                <RoundImage />
                <div className={styles.online} />
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CNavbar;
