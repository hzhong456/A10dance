import React from 'react';
import {Navbar, Container, Nav,} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Menu = (props) => {
  const logout = () => {
    props.setToken(null);
    props.setName(null);
    localStorage.clear();
    props.client.resetStore();
  };

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <LinkContainer to='/'><Navbar.Brand href='/'>A10Dance</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {props.token && <LinkContainer to='/dashboard'><Nav.Link href='#'>Dashboard</Nav.Link></LinkContainer>}
            {props.token && <LinkContainer to='/attendance-list'><Nav.Link href='#'>Attendance List</Nav.Link></LinkContainer>}
          </Nav>
          <Nav>
            {props.token && <LinkContainer to='/account'><Nav.Link href='#'>{props.name || 'Not signed in yet'}</Nav.Link></LinkContainer>}
            {!props.token && <LinkContainer to='/login'><Nav.Link href='#'>Login</Nav.Link></LinkContainer>}
            {!props.token && <LinkContainer to='/register'><Nav.Link href='#'>Register</Nav.Link></LinkContainer>}
            {props.token && <LinkContainer onClick={logout} to='/'><Nav.Link href='#'>Logout</Nav.Link></LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
