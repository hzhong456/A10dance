import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap';

const Menu = (props) => {
  const logout = () => {
    props.setToken(null);
    localStorage.clear();
    props.client.resetStore();
  };

  return (
    <Navbar collapseOnSelect expand='lg' style={{ backgroundColor: '#e3f2fd' }} variant='light'>
      <Container>
        <Navbar.Brand href="#">A10Dance</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {!props.token && <Nav.Link href='#' as='span'><Link to='/'>Welcome</Link></Nav.Link>}
            {props.token && <Nav.Link href='#' as='span'><Link to='/'>Dashboard</Link></Nav.Link>}
            {props.token && <Nav.Link href='#' as='span'><Link to='/attendance'>Attendance</Link></Nav.Link>}
            {props.token && <Nav.Link href='#' as='span'><Link to='/account'>Account</Link></Nav.Link>}
          </Nav>
          <Nav>
            {props.token
              ? <Nav.Link href='#' as='span'>Logged in test</Nav.Link>
              : <Nav.Link href='#' as='span'><Link to='/login'>Login</Link></Nav.Link>
            }
            {props.token && <Nav.Link href='#' as='span'><Button variant='danger' onClick={logout}>Logout</Button></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
