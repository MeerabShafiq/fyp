import clsx from 'clsx';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../../../scss/components/navbar/navbar.module.scss'
import RoundImage from '../core/profile/RoundImage';
import Image from '../svgbtn/SvgButton';

const CNavbar = () => {
  return (
    <Navbar expand="lg" className={styles.nav_container}>
    <Container fluid>
      <Navbar.Brand href="#"><RoundImage/></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
      <Form className={clsx(styles.nav_search, "d-flex")}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="ms-2 "
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav
          className= "ms-auto my-2 my-lg-0"
          style={{ maxHeight: '120px' }}
          navbarScroll
        >
          <Nav.Link href="#action1" className='me-2'><Image use='notification' width='30' height='30'/></Nav.Link>
          <Nav.Link href="#action2" className='me-2'><Image className='' use='message' width='22' height='38'/></Nav.Link>
          <Nav.Link href="#" className={styles.pnav_color} >
            Switch to Buyer
          </Nav.Link>
          <Nav.Link href="#" className={styles.pnav_color}>
            <RoundImage/>
          </Nav.Link>
        </Nav>
       
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default CNavbar