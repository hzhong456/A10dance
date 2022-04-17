import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap';

const Menu = (props) => {
  const logout = () => {
    props.setToken(null);
    props.setName(null);
    localStorage.clear();
    props.client.resetStore();
  };

  return (
    <Navbar collapseOnSelect expand='lg' style={{ backgroundColor: '#e3f2fd' }} variant='light'>
      <Container>
        <Navbar.Brand href=''>A10Dance</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {!props.token && <Nav.Link href='#' as='span'><Link to='/'>Welcome</Link></Nav.Link>}
            {props.token && <Nav.Link href='#' as='span'><Link to='/'>Dashboard</Link></Nav.Link>}
            {props.token && <Nav.Link href='#' as='span'><Link to='/attendance-list'>Attendance List</Link></Nav.Link>}
          </Nav>
          <Nav>
            {props.token && <Nav.Link href='#' as='span'><Link to='/account'>{props.name}</Link></Nav.Link>}
            {!props.token && <Nav.Link href='#' as='span'><Link to='/login'>Login</Link></Nav.Link>}
            {!props.token && <Nav.Link href='#' as='span'><Link to='/register'>Register</Link></Nav.Link>}
            {props.token && <Nav.Link href='#' as='span'><Link onClick={logout} to='/'>Logout</Link></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
