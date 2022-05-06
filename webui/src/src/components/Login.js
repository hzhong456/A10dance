import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Card, Form,
  Button, Row, Col,
} from 'react-bootstrap';
import { LOGIN } from '../queries';
import Notification from './Notification';

const Login = (props) => {
  const [message, setMessage] = useState(null);
  let messageTimeout;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onCompleted: () => navigate('/'),
    onError: (err) => {
      setMessage(['error', `${err}`]);
      clearTimeout(messageTimeout);
      messageTimeout = setTimeout(() => {
        setMessage(null);
      }, 5000);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      const { name } = result.data.login.user;
      props.setToken(token);
      props.setName(name);
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
    }
  }, [props, result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({
      variables: { username, password },
    });
  };

  return (
    <Card className='login-box mx-auto'>
      <Card.Header>Login</Card.Header>
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
        </Form.Group>
        <Button type='submit' className='login-button'>Login</Button>
      </Form>
    </Card>
  );
};

export default Login;
