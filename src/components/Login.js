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
    onCompleted: () => {
    },
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
      const role = result.data.login.user.role;
      props.setToken(token);
      props.setName(name);
      props.setRole(role);
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('role', role)

      if (role === "Student") {
        navigate('/dashboard')
      }
      else {
        navigate('/attendance-list')
      }
    }
  }, [props, navigate, result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({
      variables: { username, password },
    });
  };

  return (
    <div className='bg-white border border-dark border-opacity-25 p-5 rounded-4'>
      <h2>Login</h2>
      <Notification message={message} />
      <Form onSubmit={submit} className='login-form'>
        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={({ target }) => setUsername(target.value)} />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </Form.Group>
        <Button type='submit' variant='primary'>Login</Button>
      </Form>
    </div>
  );
};

export default Login;
