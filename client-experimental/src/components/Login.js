import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
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
      props.setToken(token);
      localStorage.setItem('token', token);
    }
  }, [props, result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({
      variables: { username, password },
    });
  };

  return (
    <div>
      <Notification message={message} />
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={({ target }) => setUsername(target.value)} />
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          <Button type='submit'>Login</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
