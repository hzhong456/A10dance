import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Card, Form,
  Button, Row, Col,
} from 'react-bootstrap';
import { REGISTER } from '../queries';
import Notification from './Notification';

const Register = () => {
  const [message, setMessage] = useState(null);
  let messageTimeout;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');

  const [register] = useMutation(REGISTER, {
    onCompleted: () => {
      setMessage(['added', `Account ${username} created`]);
      clearTimeout(messageTimeout);
      messageTimeout = setTimeout(() => {
        setMessage(null);
      }, 5000);
    },
    onError: (err) => {
      setMessage(['error', `${err}`]);
      clearTimeout(messageTimeout);
      messageTimeout = setTimeout(() => {
        setMessage(null);
      }, 5000);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    register({
      variables: {
        username,
        password,
        name,
        role,
      },
    });
  };

  return (
    <Card className='login-box mx-auto'>
      <Card.Header>Register</Card.Header>
      <Notification message={message} />
      <Form onSubmit={submit} className='login-form'>
        <Form.Group>
          <Row>
            <Col md={3}>
              <Form.Label>Username</Form.Label>
            </Col>
            <Col>
              <Form.Control value={username} onChange={({ target }) => setUsername(target.value)} />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col>
              <Form.Control type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Label>Name</Form.Label>
            </Col>
            <Col>
              <Form.Control value={name} onChange={({ target }) => setName(target.value)} />
            </Col>
          </Row>
          <Row>
          <Col md={3}>
            <Form.Label>Role</Form.Label>
          </Col>
          <Col>
            <Form.Check type={'radio'} name={'role'} label={'Student'} checked onChange={() => setRole('Student')} />
            <Form.Check type={'radio'} name={'role'} label={'Professor'} onChange={() => setRole('Professor')} />
          </Col>
          </Row>
          <Button type='submit'>Register</Button>
        </Form.Group>
      </Form>
      </Card>
  );
};

export default Register;
